import styles from "../styles/About.Module.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className={`${styles.about} container mt-5 `}>
        <div className="row g-0 d-flex  align-items-center mb-3 p-4">
          <div className="col-md-6 order-md-2 p-lg-3">
            <img
              src="https://i.imgur.com/VZbb5FD.png"
              alt="about company section - white car"
              className={`${styles.imgContainer}`}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body me-lg-4">
              <h5 className=" fs-1 card-title  text-sm-center text-md-start mb-5">
                About Company
              </h5>
              <p className="card-text mt-5">
                Once the pickup braked the upfit. The aluminum engine was
                crashed by the Hino? The heavy duty, lifted pickup truck
                deconstructed. Once the wheel deconstructed the welder body
                while the upfitted hybrid was dumped by the axle.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 mt-5 d-flex ">
          <div className="row g-0 d-flex  align-items-center mb-3 p-4">
            <div className="col-md-6 p-lg-3">
              <img
                src="https://i.imgur.com/hm7w73f.png"
                alt="USP car"
                className={`${styles.imgContainer}`}
              />
            </div>
            <div className="col-md-6 ">
              <div className="card-body ms-lg-4">
                <h5 className=" fs-1 mb-5 card-title text-sm-center text-md-start mb-lg-4">
                  We do things
              </h5>
                <p className="card-text mt-5">
                  The axle crashed the work-ready service utility van. The
                  aluminum axle was manufactured by the mobility. Once the
                  rollback body demolished the lorry. Once the Hino upfitted the
                  chipper body. The hauler body upfitted the diesel Nissan.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {/* <!--== Start Call to action Wrapper ==--> */}
        <div className={`${styles.callToActionContentArea} sm-top`}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="call-to-action-txt">
                  <h2>CARS THAT EVERYONE DREAMS OFF <span className="d-block mt-3">FIND YOUR CAR HERE</span> </h2>
                  <Link className={`${styles.findButton} btn mt-5`} to="/">
                    Shop Now
                      </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container ">
          <div className={styles.callToActionImageArea}>
            <div className={`${styles.imgWrapper} col-12 col-md-8 `}>
              <img style={{ width: '100%' }} src="https://i.imgur.com/JympBXg.png" alt="yellow audi" />
            </div>
          </div>
        </div>
      </div>
      {/* <!--== End Call to action Wrapper ==--> */}

      {/* subscribe to newsletter */}
      <div className={`${styles.subscribe} container-fluid`}>
        <div className="container">
          <div className="row text-center align-middle">
            <div className={`${styles.newsletterContent}  text-center`}>
              <h4>SPECIAL <span>OFFER</span> FOR SUBSCRIPTION</h4>
              <h2>GET INSTANT DISCOUNT FOR MEMBERSHIP</h2>
              <p>Subscribe to our newsletter and all latest news of our <br />latest product, promotion and offers
                        </p>
              <div className={`${styles.newsletterFormWrap}`}>
                <form action="#" method="#">
                  <div className={`${styles.formContent}`}>
                    <input type="email" placeholder="Enter your email here" />
                    <button className={`${styles.btnNewsletter}`}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--== Start Need Help area ==--> */}
      <div className={`${styles.needHelpArea} mt-5`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-7 ">
              <div className="need-help-content mb-sm-20">
                <h3 className="mb-4 fs-2">Need Help ?</h3>
                <p>Call our support 24/7 at <b className="">01234&nbsp;567&nbsp;890</b> </p>
              </div>
            </div>

            <div className="col-sm-5 text-center text-sm-right mt-4 mt-md-0">
              <a href="mailto:alicia@mailgo.dev" className={`${styles.helpBtn} btn`}>Or send e-mail </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!--== End Need Help area ==--> */}
    </>
  );
}

export default About;
