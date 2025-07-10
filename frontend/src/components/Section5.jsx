import InfiniteMenu from './InfiniteMenu'

const items = [
  {
    image: 'https://fra.cloud.appwrite.io/v1/storage/buckets/682766ea0023b9f55e6a/files/6845b145001fc8d9b8f6/view?project=6827669e0034bd430c0f',
    link: 'https://google.com/',
    title: 'ExtraMile',
    description: 'Mentorship program for student'
  },
  {
    image: 'https://fra.cloud.appwrite.io/v1/storage/buckets/682766ea0023b9f55e6a/files/682e19470016a5b5a53b/view?project=6827669e0034bd430c0f',
    link: 'https://google.com/',
    title: 'WorkShop',
    description: 'Linkedin Workshop'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-2.avif?updatedAt=1747310810989',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

export default function Section5() {
  return (
    <div
      className="relative w-full h-full text-white"
      style={{ background: 'linear-gradient(to bottom, #4E46E4, black)'}}
    >
      <InfiniteMenu items={items} />
    </div>
  );
}