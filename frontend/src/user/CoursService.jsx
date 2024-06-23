import React from 'react';

export default function CoursService() {
  return (
    <div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .title {
            color: #4a70ea;
          }
          .card {
            position: relative;
            z-index: 1;
            overflow: hidden;
            transition: 0.5s;
            height: 100%;
            margin-left: 70px;
            width: 300px; /* Adjusted width of the cards */
          }

          .card:hover {
            color: white;
          }

          .card::before {
            content: "";
            position: absolute;
            left: -100%;
            top: 0;
            background: #4a70ea;
            width: 100%;
            height: 100%;
            transition: 0.5s;
            z-index: -1;
          }
          .card:hover::before {
            left: 0;
          }

          .card-body {
            height: 350px; /* Set the height of card body */
          }

          .card-body h3 {
            color: #4a70ea;
          }

          .card:hover .card-body h3 {
            color: white;
          }

          .bt {
            background-color: #4a70ea;
            color: white;
            transition: 0.5s;
            
          }
          .card:hover .bt {
            background-color: white;
            color: #4a70ea;
          }
          .bt:hover {
            background-color: white;
            color: #4a70ea;
          }
          .p {
            text-align: center;
          }

          .card:hover .p {
            color: white;
          }

          h3 {
            text-align: center;
          }
          
        `}
      </style>

      <div className="container-fluid">
        <h1 className="text-center mt-5 display-3 fw-bold">
          Our <span className="title">Program</span>
        </h1>
        <hr className="mx-auto mb-5 w-25" />

        <div className="row mb-5 gx-3">
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h3>First Year Engineering Cycle</h3>
                <hr className="mx-auto w-75" />
                <p className='p'>
                  Foundational year focusing on cybersecurity fundamentals. Covers digital electronics, network basics, and ethical hacking. Practical skills in programming and system administration are emphasized.
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    className="bt btn mx-2"
                    href="/user/cours/modules/CI1/S1"
                    role="button"
                  >
                    Semester 1
                  </a>
                  <a
                    className="bt btn mx-2"
                    href="/user/cours/modules/CI1/S2"
                    role="button"
                  >
                    Semester 2
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h3>Second Year Engineering Cycle</h3>
                <hr className="mx-auto w-75" />
                <p className='p'>
                  Advanced year deepening knowledge in cybersecurity. Explores network security, artificial intelligence, and cloud computing. Practical experiences include projects, internships, and certification prep.
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    className="bt btn mx-2"
                    href="/user/cours/modules/CI2/S3"
                    role="button"
                  >
                    Semester 3
                  </a>
                  <a
                    className="bt btn mx-2"
                    href="/user/cours/modules/CI2/S4"
                    role="button"
                  >
                    Semester 4
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h3>Third Year Engineering Cycle</h3>
                <hr className="mx-auto w-75" />
                <p className='p'>
                  Exploration year at the forefront of cybersecurity innovation. Topics include wireless sensor networks, IoT, and real-time operating systems. Specialized courses cover security architectures, governance, and management.
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    className="bt btn mx-2"
                    href="/user/cours/modules/CI3/S5"
                    role="button"
                  >
                    Semester 5
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
