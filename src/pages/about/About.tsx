import Link from '../../components/Link';

function About() {
  return (
    <main>
      <h1 className="fs-xxl fw-600">Actually, we sell products</h1>
      <div className="fs-xl tc-accent fw-200">...but we are not ready to do it yet.</div>
      <div className="fs-l fw-300 text-common tc-light">
        Please stop by our shop later. We <span className="fw-700 tc-accent"> guarantee </span> that
        there will be something fascinating for you!
      </div>
      <div className="fs-s fw-300 text-footnote">
        If you want to get more information about this project,
        <Link page={'./README.md'}>
          <div>click here</div>
        </Link>
      </div>
    </main>
  );
}

export default About;
