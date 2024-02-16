import Table from '../../components/Table/Table'
import TopBar from '../../components/TopBar/TopBar'

export default function Home() {
  return (
    <>
     <div><TopBar/></div>
    <div style={{
      minHeight: '90vh',
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Table /> 
    </div>
    </>
       
  )
}
