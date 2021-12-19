import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useContext,
  useState,
} from 'react'
import { Link } from 'react-router-dom'

import Form from '../../../Components/Form/Form'
import FormInput from '../../../Components/Form/FormInput'
import LoginStatements from '../../../Configs/ModalStatements.json'
import ModalContext from '../../../Context/ModalContext'
import { isLoggedIn } from '../../../Hooks/Auth/getAuth'
import FormCheckBox from '../../../Components/Form/FormCheckBox'
import { HomeHeaderHub } from '../../../Shared/Images/Images'

const HomeHeaderV2: FC = (): ReactElement => {
  const { setOpenModal, setModalType } = useContext(ModalContext)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    roleId: '5e2fd51f34ce7375a792ffc4',
    terms: false,
    confirmAge: false,
  })

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setValues({ ...values, [name]: checked })
      return
    }
    setValues({ ...values, [name]: value })
  }

  const onSignIn = () => {
    if (isLoggedIn) {
      return
    }
    setOpenModal(true)
    setModalType('login')
  }

  return (
    <header className="banner mt-navbar">
      <div className="d-flex w-100 h-100">
        <div className="m-auto" style={{ display: 'inline-block' }}>
          <p
            className="text-dark-blue"
            style={{
              marginBottom: '0px',
              textAlign: 'center',
              fontSize: '48px',
              fontWeight: 400,
            }}
          >
            Welcome to the
          </p>
          <p
            className="banner__text"
            style={{
              color: '#FFD300',
              lineHeight: '176px',
              fontSize: '174px',
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            HUB
          </p>
          <p
            style={{
              color: 'gray',
              width: `${174 * 3 + 10}px`,
              fontSize: '24px',
              fontWeight: 400,
              textAlign: 'center',
            }}
            className="banner__text"
          >
            Your one-stop shop for solutions on Youth Employment and
            Entrepreneurship.
          </p>
        </div>
      </div>
    </header>
  )
}

export default HomeHeaderV2
