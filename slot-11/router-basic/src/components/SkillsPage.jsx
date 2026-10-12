import { Container, ListGroup } from 'react-bootstrap'
import { SKILLS } from '../data/skills.js'

function SkillsPage() {
  return (
    <section className="content-section">
      <Container>
        <p className="eyebrow">NĂNG LỰC</p>
        <h1 className="section-title">Kỹ năng của mình</h1>
        <p className="section-intro">
          Những công cụ và công nghệ mình sử dụng để biến ý tưởng thành sản
          phẩm.
        </p>
        <ListGroup className="skills-list">
          {SKILLS.map((skill, index) => (
            <ListGroup.Item
              className="skill-item"
              key={skill.name}
            >
              <span className="skill-number">0{index + 1}</span>
              <span>
                <strong>{skill.name}</strong>
                <small>{skill.detail}</small>
              </span>
              <span className="skill-arrow" aria-hidden="true">
                ↗
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  )
}

export default SkillsPage
