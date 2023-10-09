import React from 'react';
import ImageSlider from './ImageSlider'; // Import your ImageSlider component

const ProductDetails = () => {

  const images = [
    // "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    // "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    // "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    // "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
    "https://img.freepik.com/premium-photo/craft-supplies-knitting-creative-handmade-top-view-black-background-organizing-diy-elements-board_290431-18075.jpg",
    "https://media.istockphoto.com/id/1191907689/photo/putting-reusable-wooden-gift-tag-on-homemade-jars-of-preserved-fruit-for-eco-friendly.jpg?s=1024x1024&w=is&k=20&c=JZyem_WIk9SPRPd5IpRe6XXWtfYuv24mELHHjoDhxjI=",
    "./assests/main.jpeg",
    "https://c1.wallpaperflare.com/preview/992/229/146/pottery-souvenir-traditional-art-travel-craft.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/506/223/desktop-wallpaper-vintage-wood-gift-holiday-paper-cute-decoration-dirty-craft-handmade-crafts-event-section-%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%B8%D0%BA%D0%B8-paper-crafts.jpg",
    "https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZG1hZGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    
  ];

  return (
    <div>
      {/* Product details content */}
      {/* ... (other product details) */}

      {/* Display the image slider */}
      <ImageSlider images={images} />
    </div>
  );
};

export default ProductDetails;
