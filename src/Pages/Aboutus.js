import React from 'react'


function Aboutus() {
  return (
    <div>
        <div className='container-fluid' style={{maxWidth:'100%'}}> 
      <img src='/assests/about.webp' height="auto" width="auto"  className='img-fluid'></img>
      <h1 className='text-center mt-5'>My BLOG</h1>

      <div className='row mt-5'>
         <div className='col-4 text-center'>
            <h1>Craft is a <br/> Theraphy</h1>
            </div>

            <div className='col-8 text-center' style={{fontWeight:'bold'}}>
              <p>Not only crafts are for children.Accordingly to a study for a Research Institute for Craetive Arts Theraphies,can also get iin on the fun because crafts can lower stress,boost mood, and promote self-confidence.Explore these simple and practical crafts for adults that fooster creativity and import new abilities like sewing or painitng.</p>
            </div>
      </div>

     <div className='container mt-5' style={{backgroundColor:'skyblue'}}>
       <h1 className='text-center'>Our Company</h1>
       <div className='justify-content-center align-items-center text-center mt-5' >
            <img src='/assests/about1.jpg' height="auto"  width="auto" className='img-fluid'></img>
      </div>

      <div className='row text-center mt-5'style={{fontWeight:'bold'}} >
        <p >We make every effort to Offer you the finest craft products.In and <br/> around Hyderabad , we advertise and sell our locally made crafts and<br></br> artwork . We sell our products directly to consumers who wish to stylishly <br/> decorate their homes and who want to delight their loved ones with <br/> handcrafted surprises.</p>
      </div>

      <div className='row mt-5'>
        <div className='col-6'>
           <h1>Vision:</h1>
           <p style={{fontWeight:'bold'}}>To protect and develop Indian artisanal and craftskills so they continue to be vital  part of our cultural heritage.</p>
        </div>

        <div className='col-6'>
           <h1>Mission:</h1>
           <p style={{fontWeight:'bold'}}>enabling artists and crafters ability as a sustainable source of income for disadvantaged groups.</p>
        </div>
      </div>


     </div>


     <div className='mt-5 text-center'>
        <img src='\assests\about2.jpg' height="auto" width="auto" className='img-fluid'></img>
     </div>

     <div className='text-center mt-5'>
        <h1>Our Works</h1>
        <h5 className='mt-3'>
        Supplying systematic, long-term development <br/> assistance to enable the use of crafts as a source of <br/> income and a way of life and enhancing the skills <br/> and businesses of traditional craftspeople and <br/> members of marginalized communities.
        </h5>
     </div>

     <div className='mt-5 text-center'>
        <p style={{fontWeight:'bold'}}> Craft and fine arts develop professionally when our creations are seen <br/> by more people and as their distinctive styles become more well-known.<br/> Our work frequently changes throughout time, and we are constantly <br/> coming up with new concepts.</p>
     </div>

     <div className='container mt-5 ' style={{backgroundColor:'skyblue'}}>
       <div className='row'>
       <div className='text-center col-6'>
          <img src='\assests\back.avif' className='img-fluid mt-5'></img>
    </div> 
    <div className='col-6'>
      <h5 className='mt-5'>Best Quality Products</h5>

      <h1 className='mt-5'>Join The Craft <br/> Movement</h1>
      <h6 style={{fontWeight:'bold'}}>Enjoy each moment that you are given in life! Unique and beautiful products inspired by memorable occasions.</h6>

      <div className='mt-5'>
      <button type="button" className="btn btn-lg btn-success">
      <i class="fa-solid fa-cart-shopping"></i>  Shop Now
     </button>
     </div>
    </div>
    </div>
     </div>

     <div className='mt-5'>
      <h1 className='text-center'>Best Selling Products</h1>
      <img src='\assests\main.jpeg' className='img-fluid mt-5' />
     </div>

     <div className='container bg-black mt-5'>
        <div className='row'>
        <div className='col-6 text-white mt-5'>
            <h1>Get 25%  Off on Your First <br/> Purchase!</h1>
        </div>

        <div className='col-6 mt-5'>
                 <button className='btn btn-lg btn-success'> <i class="fa-solid fa-cart-shopping"></i> Shop Now</button>
        </div>

       </div>
     </div>

    </div>
    </div>
  )
}

export default Aboutus