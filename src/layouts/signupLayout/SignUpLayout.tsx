import SignUpHeader from '../../components/SignUpHeader/index'
import Footer from '../../components/Footer/index'
interface Props {
  children?: React.ReactNode
}
export default function SignUpLayout({ children }: Props) {
  return (
    <div>
      <SignUpHeader />
      {children}
      <Footer />
    </div>
  )
}
