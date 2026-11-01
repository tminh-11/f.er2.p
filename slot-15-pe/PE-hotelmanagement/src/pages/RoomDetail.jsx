import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { fetchRoomById } from '../api/roomApi'
import { useRoom } from '../context/RoomContextValue'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRoom()
  const { roomTypes } = state
  const [detail, setDetail] = useState({ id: null, room: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    fetchRoomById(id)
      .then((room) => {
        if (active) setDetail({ id, room, loading: false, error: null })
      })
      .catch((err) => {
        if (active) setDetail({ id, room: null, loading: false, error: err.message || 'Failed to load room.' })
      })
    return () => { active = false }
  }, [id])

  const currentDetail = detail.id === id ? detail : null
  if (!currentDetail || currentDetail.loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (currentDetail.error) return <Alert variant="danger">{currentDetail.error}</Alert>
  const { room } = currentDetail
  if (!room) return null

  const roomTypeName = roomTypes.find((rt) => String(rt.id) === String(room.roomTypeId))?.name ?? '—'

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Back</Button>
      <Card className="shadow-sm">
        <Card.Header as="h4">{room.name}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Room Type: <Badge bg="secondary">{roomTypeName}</Badge></ListGroup.Item>
            <ListGroup.Item>Floor: {room.floor}</ListGroup.Item>
            <ListGroup.Item>View: {room.view}</ListGroup.Item>
            <ListGroup.Item>Price Weekday: {formatVND(room.priceWeekday)}</ListGroup.Item>
            <ListGroup.Item>Price Weekend: {formatVND(room.priceWeekend)}</ListGroup.Item>
            <ListGroup.Item>Last Renovated: {formatDateDisplay(room.lastRenovated)}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
