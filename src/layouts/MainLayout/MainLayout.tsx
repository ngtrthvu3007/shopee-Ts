import Footer from '../../components/Footer/index'
import MainHeader from '../../components/MainHeader/index'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <MainHeader />
      {children}
      <Footer />
    </div>
  )
}
