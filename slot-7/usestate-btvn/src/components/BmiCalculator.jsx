import { useState } from 'react'
import { Alert, Button, ButtonGroup, Form } from 'react-bootstrap'

function classify(bmi) {
  if (bmi < 18.5) return { label: 'Thiếu cân', variant: 'info' }
  if (bmi < 23) return { label: 'Bình thường', variant: 'success' }
  if (bmi < 25) return { label: 'Thừa cân', variant: 'warning' }
  return { label: 'Béo phì', variant: 'danger' }
}

function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('cm')

  const h = Number(height)
  const w = Number(weight)
  const heightMeters = unit === 'cm' ? h / 100 : h
  const errors = {}

  if (height !== '') {
    const minHeight = unit === 'cm' ? 50 : 0.5
    const maxHeight = unit === 'cm' ? 250 : 2.5
    if (!(h >= minHeight && h <= maxHeight)) {
      errors.height = `Chiều cao từ ${minHeight} đến ${maxHeight} ${unit}`
    }
  }

  if (weight !== '' && !(w >= 10 && w <= 300)) {
    errors.weight = 'Cân nặng từ 10 đến 300 kg'
  }

  const ready =
    height !== '' && weight !== '' && !errors.height && !errors.weight
  const bmi = ready ? w / heightMeters ** 2 : null
  const result = bmi === null ? null : classify(bmi)

  const changeUnit = (nextUnit) => {
    if (nextUnit === unit) return

    if (height !== '') {
      const currentHeight = Number(height)
      if (Number.isFinite(currentHeight)) {
        const converted =
          unit === 'cm' ? currentHeight / 100 : currentHeight * 100
        setHeight(String(Number(converted.toFixed(10))))
      }
    }

    setUnit(nextUnit)
  }

  return (
    <main className="bmi-page">
      <section className="bmi-shell" aria-labelledby="bmi-title">
        <div className="bmi-eyebrow">REACT · DERIVED STATE</div>
        <div className="bmi-heading-row">
          <div>
            <h2 id="bmi-title">Máy tính BMI</h2>
            <p className="bmi-intro">Nhập chiều cao và cân nặng để xem kết quả.</p>
          </div>
          <span className="bmi-standard">Chuẩn châu Á</span>
        </div>

        <Form className="bmi-form" onSubmit={(event) => event.preventDefault()}>
          <div className="bmi-fields">
            <Form.Group controlId="bmi-height">
              <div className="bmi-label-row">
                <Form.Label>Chiều cao</Form.Label>
                <ButtonGroup size="sm" aria-label="Đơn vị chiều cao">
                  <Button
                    variant={unit === 'cm' ? 'success' : 'outline-success'}
                    aria-pressed={unit === 'cm'}
                    onClick={() => changeUnit('cm')}
                  >
                    cm
                  </Button>
                  <Button
                    variant={unit === 'm' ? 'success' : 'outline-success'}
                    aria-pressed={unit === 'm'}
                    onClick={() => changeUnit('m')}
                  >
                    m
                  </Button>
                </ButtonGroup>
              </div>
              <Form.Control
                type="number"
                step="any"
                min={unit === 'cm' ? 50 : 0.5}
                max={unit === 'cm' ? 250 : 2.5}
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                isInvalid={Boolean(errors.height)}
                aria-describedby="bmi-height-help"
                placeholder={unit === 'cm' ? 'Ví dụ: 170' : 'Ví dụ: 1.7'}
              />
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="bmi-weight">
              <Form.Label>Cân nặng (kg)</Form.Label>
              <Form.Control
                type="number"
                step="any"
                min="10"
                max="300"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                isInvalid={Boolean(errors.weight)}
                aria-describedby="bmi-weight-help"
                placeholder="Ví dụ: 65"
              />
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Form>

        <p className="bmi-help" id="bmi-height-help">
          Chiều cao hợp lệ: {unit === 'cm' ? '50–250 cm' : '0.5–2.5 m'}.
          {' '}Ô số được lưu dưới dạng chuỗi để có thể để trống khi nhập.
        </p>
        <span className="visually-hidden" id="bmi-weight-help">
          Cân nặng hợp lệ từ 10 đến 300 kg.
        </span>

        {result ? (
          <Alert className="bmi-result" variant={result.variant}>
            BMI = {bmi.toFixed(1)} <span aria-hidden="true">→</span>{' '}
            {result.label}
          </Alert>
        ) : (
          <p className="bmi-prompt">
            Nhập chiều cao và cân nặng hợp lệ để xem chỉ số BMI.
          </p>
        )}
      </section>
    </main>
  )
}

export default BmiCalculator
