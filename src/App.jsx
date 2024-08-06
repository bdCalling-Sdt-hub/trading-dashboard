
import { Link } from 'react-router-dom'
import './App.css'

import Overview from './Components/Dashboard/Overview'
import SubscriptionGrowth from './Components/Dashboard/SubscriptionGrowth'
import JoinRequest from './Components/Dashboard/JoinRequest'
import user from './assets/images/user.png'
import income from './assets/images/income.png'
import platinum from './assets/images/platinumn.png'
import gold from './assets/images/dollar_gold.png'
import diamond from './assets/images/daimond.png'
function App() {
  const data = [
    {
      title: 'Total User',
      icon : user,
      count: 5480,
    },
    {
      title: 'Total Income',
      icon : income,
      count: 1480,
    },
    {
      title: 'Gold User',
      icon : gold,
      count: 548,
    },
    {
      title: 'Platinum User',
      icon : platinum,
      count: 548,
    },

    {
      title: 'Diamond User',
      icon : diamond,
      count: 548,
    },
  ]
  return (
    <>
      <div className='grid-5 gap-3'>
        {
          data?.map((item, index) => <div className='w-full h-full center-center flex-col gap-3 py-7 bg-[var(--color-7)] p-2 rounded-md' key={index}>
            <p className='text-2xl'>{item?.title}</p>
            <img src={item?.icon} />
            <p className='text-3xl font-semibold'>{item?.count}</p>
          </div>)
        }
      </div>
      <div className='grid-2 mt-3 gap-3'>
      <div className='w-full h-full bg-white p-4 rounded-md'>
          <SubscriptionGrowth />
        </div>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <Overview />
        </div>
      
      </div>
      <div className='mt-3 bg-white rounded-md'>
        <div className='between-center gap-2 mb-3 p-5'>
          <p className='text-xl'>New Membership Request</p> <Link to={`/total-join-request`}>
          View All
          </Link>
        </div>
        <JoinRequest />
      </div>
    </>
  )
}

export default App
