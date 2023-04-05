import TinderCard from "react-tinder-card";

const Dashboard = () => {

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
      }
      
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }


    return (
        <div className="dashboard">
            {/* <ChatContainer/> */} 
            <div className="swiper_container">
                <div className="card-container">
                <TinderCard onSwipe={onSwipe} 
                            onCardLeftScreen={() => onCardLeftScreen('fooBar')} 
                            preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;