import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB connection string is not defined in environment variables');
        }

        const connectWithRetry = async (retries = 5, interval = 5000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    await mongoose.connect(process.env.MONGODB_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        serverSelectionTimeoutMS: 5000,
                        socketTimeoutMS: 45000,
                        maxPoolSize: 10,
                        minPoolSize: 2,
                        maxIdleTimeMS: 30000,
                        retryWrites: true,
                    });
                    return;
                } catch (err) {
                    if (i === retries - 1) throw err;
                    console.log(`Retrying connection attempt ${i + 1} of ${retries}...`);
                    await new Promise(resolve => setTimeout(resolve, interval));
                }
            }
        };

        await connectWithRetry();

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            if (err.name === 'MongoNetworkError') {
                console.log('Attempting to reconnect to MongoDB...');
                connectWithRetry(3, 3000).catch(error => {
                    console.error('Failed to reconnect to MongoDB:', error);
                });
            }
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            if (mongoose.connection.readyState === 0) {
                console.log('Attempting to reconnect to MongoDB...');
                connectWithRetry(3, 3000).catch(error => {
                    console.error('Failed to reconnect to MongoDB:', error);
                });
            }
        });

        // Monitor connection state
        setInterval(() => {
            const state = mongoose.connection.readyState;
            const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
            console.log(`MongoDB connection state: ${states[state]}`);
        }, 60000); // Check every minute

        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error while closing MongoDB connection:', err);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;