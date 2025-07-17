export const WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Welcome to E-CELL SMVIT!</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #1a1a1a; /* Dark background */
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff; /* White content area */
      border-radius: 8px;
      overflow: hidden;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #8A2BE2; /* Purple button */
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    .logo {
      text-align: center;
      padding: 24px 0;
      background-color: #8A2BE2; /* Purple header for logo */
    }

    .logo img {
      max-width: 150px; /* Adjust as needed */
      height: auto;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        margin: 30px auto !important; /* Adjust margin for smaller screens */
      }

      .button {
        width: 70% !important; /* Make button slightly wider on small screens */
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#1a1a1a">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="logo">
                  <img src="https://www.ecellsmvit.in/images/ecellwhite.png" alt="E-CELL SMVIT Logo">
                </td>
              </tr>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold; text-align: center;">
                          Welcome to E-CELL SMVIT!
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          Hello {{name}},
                          <br><br>
                          We're thrilled to welcome you to the **E-CELL SMVIT community**! We're excited to have you join us in fostering entrepreneurship and innovation.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%;">
                          At E-CELL SMVIT, we aim to provide a platform for students to explore their entrepreneurial ideas, connect with like-minded individuals, and gain valuable insights from industry experts.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p style="font-size: 14px; line-height: 150%;">
                            Feel free to explore our website and learn more about our upcoming events, workshops, and initiatives. If you have any questions or just want to say hello, don't hesitate to reach out to us at <span style="color: #9370DB; font-weight: bold;">ecellsmvit@gmail.com</span>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We look forward to seeing you at our next event!
                          <br><br>
                          Best regards,
                          <br>
                          The E-CELL SMVIT Team
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify - E-CELL SMVIT</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #1a1a1a; /* Dark background */
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff; /* White content area */
      border-radius: 8px;
      overflow: hidden;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #8A2BE2; /* Purple button */
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    .logo {
      text-align: center;
      padding: 24px 0;
      background-color: #8A2BE2; /* Purple header for logo */
    }

    .logo img {
      max-width: 150px; /* Adjust as needed */
      height: auto;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        margin: 30px auto !important; /* Adjust margin for smaller screens */
      }

      .button {
        width: 70% !important; /* Make button slightly wider on small screens */
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#1a1a1a">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="logo">
                  <img src="https://www.ecellsmvit.in/images/ecellwhite.png" alt="E-CELL SMVIT Logo">
                </td>
              </tr>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold; text-align: center;">
                          Verify your email for E-CELL SMVIT
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away from verifying your account for this email: <span style="color: #9370DB; font-weight: bold;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px; text-align: center;">
                          <p class="button">{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 24 hours.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset - E-CELL SMVIT</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #1a1a1a; /* Dark background */
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff; /* White content area */
      border-radius: 8px;
      overflow: hidden;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #8A2BE2; /* Purple button */
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    .logo {
      text-align: center;
      padding: 24px 0;
      background-color: #8A2BE2; /* Purple header for logo */
    }

    .logo img {
      max-width: 150px; /* Adjust as needed */
      height: auto;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        margin: 30px auto !important; /* Adjust margin for smaller screens */
      }

      .button {
        width: 70% !important; /* Make button slightly wider on small screens */
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#1a1a1a">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="logo">
                  <img src="https://www.ecellsmvit.in/images/ecellwhite.png" alt="E-CELL SMVIT Logo">
                </td>
              </tr>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold; text-align: center;">
                          Forgot your password for E-CELL SMVIT?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #9370DB; font-weight: bold;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px; text-align: center;">
                          <p class="button">{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset OTP is only valid for the next 15 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;