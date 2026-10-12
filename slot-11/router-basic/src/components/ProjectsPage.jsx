import { Card, Container, Row, Col } from 'react-bootstrap'
import { PROJECTS } from '../data/projects.js'

function ProjectsPage() {
  return (
    <section className="content-section">
      <Container>
        <p className="eyebrow">TUYỂN CHỌN</p>
        <h1 className="section-title">Một vài dự án</h1>
        <p className="section-intro">
          Một số sản phẩm tiêu biểu mình đã xây dựng và thực hành.
        </p>
        <Row className="g-4 project-grid">
          {PROJECTS.map((project) => (
            <Col md={6} lg={4} key={project.number}>
              <Card className="project-card h-100">
                <Card.Body>
                  <div className="project-number">{project.number}</div>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default ProjectsPage
