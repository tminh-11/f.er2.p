import { useState } from 'react'
import { majors } from '../data/majors'

const MAX_BIO = 150

function ProfilePreview() {
  const [fullName, setFullName] = useState('')
  const [major, setMajor] = useState(majors[0])
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState('')

  function handleNameKeyDown(event) {
    if (event.key === 'Escape') {
      setFullName('')
    }
  }

  function handleBioChange(event) {
    setBio(event.target.value.slice(0, MAX_BIO))
  }

  const remaining = MAX_BIO - bio.length

  return (
    <section className="profile-preview" aria-labelledby="profile-preview-title">
      <h2 id="profile-preview-title">Hồ sơ cá nhân</h2>
      <div className="profile-preview-layout">
        <form
          className="profile-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="profile-field">
            <label htmlFor="profile-full-name">Họ tên</label>
            <input
              id="profile-full-name"
              className={`profile-control ${
                focused === 'fullName' ? 'profile-control--focused' : ''
              }`}
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              onKeyDown={handleNameKeyDown}
              onFocus={() => setFocused('fullName')}
              onBlur={() => setFocused('')}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="profile-major">Chuyên ngành</label>
            <select
              id="profile-major"
              className="profile-control"
              value={major}
              onChange={(event) => setMajor(event.target.value)}
            >
              {majors.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-bio">Giới thiệu</label>
            <textarea
              id="profile-bio"
              className="profile-control profile-bio"
              value={bio}
              onChange={handleBioChange}
              rows={5}
            />
            <small
              className={`profile-character-count ${
                remaining < 20 ? 'profile-character-count--warning' : ''
              }`}
              aria-live="polite"
            >
              Còn {remaining}/{MAX_BIO} ký tự
            </small>
          </div>

          <div className="profile-field">
            <label htmlFor="profile-password">Mật khẩu</label>
            <div className="profile-password-group">
              <input
                id="profile-password"
                className="profile-control"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="profile-toggle-password"
                type="button"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
          </div>
        </form>

        <article className="profile-card" aria-label="Xem trước hồ sơ">
          <h3>Xem trước</h3>
          <dl>
            <div className="profile-card-field">
              <dt>Họ tên</dt>
              <dd>{fullName.trim() || 'Chưa nhập tên'}</dd>
            </div>
            <div className="profile-card-field">
              <dt>Chuyên ngành</dt>
              <dd>{major}</dd>
            </div>
            <div className="profile-card-field">
              <dt>Giới thiệu</dt>
              <dd>
                {bio || <em>Chưa có giới thiệu</em>}
              </dd>
            </div>
            <div className="profile-card-field">
              <dt>Mật khẩu</dt>
              <dd>{password.length} ký tự</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  )
}

export default ProfilePreview
