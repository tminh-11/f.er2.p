import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
import { formatPriceRange } from '../utils/format'

export default function RoomTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [roomTypes, allRooms] = await Promise.all([fetchRoomTypes(), fetchRooms()])
        const foundRoomType = roomTypes.find((item) => String(item.id) === String(id))
        if (!foundRoomType) {
          navigate('/not-found', { replace: true })
          return
        }
        if (active) {
          setRoomType(foundRoomType)
          setRooms(allRooms.filter((room) => String(room.roomTypeId) === String(id)))
        }
      } catch (err) {
        if (active) setError(err.message || 'Failed to load room type details.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [id, navigate])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!roomType) return null

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/room-types')}>Back</Button>
      <Card className="shadow-sm mb-4">
        <Card.Header as="h4">
          {roomType.name} <Badge bg="secondary">ID: {roomType.id}</Badge>
        </Card.Header>
      </Card>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Floor</th>
            <th>View</th>
            <th>Price Range</th>
            <th>Last Renovated</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr><td colSpan={6} className="text-center">No rooms found for this room type.</td></tr>
          ) : rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>{room.floor}</td>
              <td>{room.view}</td>
              <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
              <td>{room.lastRenovated}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
