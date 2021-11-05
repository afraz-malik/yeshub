import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Profile from "..";
import assetUrl from "../../../Helpers/Functions/assetUrl";
import AwardApi from '../../../Helpers/Request/Services/Awards';
import MemberStats from "../Stats/Components/MemberStats";
// import { image1 } from "./data";
// import { css } from "styled-compoent";
const image1="";
const cardHeaderStyle = {
    'background-color': 'white',
    padding: '1em'
}

const cardStyle = {
    "box-shadow": "0 2px 10px lightgray"
}
const Awards:React.FC<any> = () => {
  
  const [awards, setawards] = useState([]);

  useEffect(() => {
    AwardApi.getAllAwards().then((res:any) => {
      setawards(res.data.data);
  })
  .catch((err) => {
      console.log('-- awards api error ---');
      console.log(err);
  })
  }, [])
  const [activeItem, setActive] = useState(1);
  return (
    <Profile>
    <Card  style={{boxShadow: "0 2px 10px lightgray"}}>
      <CardHeader style={cardHeaderStyle}>
        <h2 style={{fontSize: "26px", color: "243C4B, 100%"}}>Award & Point System</h2>
      </CardHeader>
      <CardBody>
        <div
          className="d-flex justify-content-between flex-wrap flex-row p-2"
          style={{ marginBottom: "1em" }}
        >
          <TopbarItem
            onItemClick={() => setActive(1)}
            heading="Dashboard"
            isActive={activeItem === 1}
          />
          <TopbarItem
            onItemClick={() => setActive(2)}
            heading="Points"
            isActive={activeItem === 2}
          />
          <TopbarItem
            onItemClick={() => setActive(3)}
            heading="Awards"
            isActive={activeItem === 3}
          />
          <TopbarItem
            onItemClick={() => setActive(4)}
            heading="Achievement"
            isActive={activeItem === 4}
          />
        </div>
        {activeItem === 3 && <div className="row">            
         {awards.map((award: any, index:number) => (
           <div className="col-md-3 col-lg-3 col-sm-3" key={index}>
            <AwardItem award={award} />
          </div>
         )) }          
        </div>}
        {activeItem === 1 && <Dashboard />}
        {activeItem === 4 && <Achievements />}
        {activeItem === 2 &&            
          <PointSystem />         
        }
      </CardBody>
    </Card>
    </Profile>
  );
};
export default Awards;

export const Award = ({}) => {};

export interface TopbarItemProps {
    isActive: Boolean;
    heading: string;
    onItemClick: any
};

export const TopbarItem:React.FC<TopbarItemProps> = ({ isActive = false, heading, onItemClick }) => {
  return (
    <div
      style={{ cursor: "pointer", textAlign:"center" }}
      onClick={onItemClick}
      className={`flex-1 p-2 m-2 ${isActive ? "b-1" : ""}`}
    >
      <span className="text-center">{heading || "Dashboard"}</span>
    </div>
  );
};

export const AwardItem : React.FC<any> = ({award}) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        
        <img
          src={assetUrl(award.images[0])}
          style={{ maxWidth: "100%", height: "90px", margin: "auto" }}
        />
        <p className="text-center" style={{ marginBottom: "5px", marginTop: "10px" }}>
          {award.awardName}
        </p>
        <p className="text-center">
          {award.cost}
        </p>
      </div>
    </>
  );
};


export const PointSystem = () => {
  const thStyle = {
    background: "243C4B",
    color: "eee"
  }

  return (
    <div style={{margin: "-1.2em"}}>
      <h3 style={{fontSize: "24px", fontWeight: 500, margin: ".5em", color: "243C4B", fontFamily: "Roboto"}}>Post Milestones</h3>
      <table className="table achievements">
        <thead>
          <th>Action</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr>
            <td>Create Post</td>
            <td>10</td>
          </tr>
          <tr>
            <td>25 likes on post</td>
            <td>+5</td>
          </tr>
          <tr>
            <td>50 likes on post</td>
            <td>+10</td>
          </tr>
          <tr>
            <td>100 likes on post</td>
            <td>+20</td>
          </tr>
          <tr>
            <td>200 likes on post</td>
            <td>+50</td>
          </tr>
          <tr>
            <td>500 likes on post</td>
            <td>+125</td>
          </tr>
          <tr>
            <td>Every 50 likes past 500</td>
            <td>+10</td>
          </tr>
          
        </tbody>
      </table>
    
      <h3 style={{fontSize: "24px", fontWeight: 500, margin: ".5em", color: "243C4B", fontFamily: "Roboto"}}>Comments Milestones</h3>
      <table className="table achievements">
        <thead>
          <th>Action</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr>
            <td>Create Comment</td>
            <td>2</td>
          </tr>
          <tr>
            <td>5 likes on Comment</td>
            <td>+1</td>
          </tr>
          <tr>
            <td>10 likes on Comment</td>
            <td>+2</td>
          </tr>
          <tr>
            <td>25 likes on Comment</td>
            <td>+4</td>
          </tr>
          <tr>
            <td>50 likes on Comment</td>
            <td>+10</td>
          </tr>
          <tr>
            <td>Every 50 likes past 50</td>
            <td>+4</td>
          </tr>          
        </tbody>
      </table>
      
      <h3 style={{fontSize: "24px", fontWeight: 500, margin: ".5em", color: "243C4B", fontFamily: "Roboto"}}>Event Milestones</h3>
      <table className="table achievements">
        <thead>
          <th>Action</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr>
            <td>Simple Event (No Sub event)</td>
            <td>*10</td>
          </tr>
          <tr>
            <td>Big Event (with subevents)</td>
            <td>**15</td>
          </tr>
          <tr>
            <td>Contribution - add edits</td>
            <td>+1</td>
          </tr>          
        </tbody>
      </table>
    
    </div>
  )
}

export const Dashboard = () => {
  const thStyle = {
    background: "243C4B",
    color: "eee"
  }

  return (
    <div style={{margin: "-1.2em"}}>
      <table className="table achievements">
        <thead>
          <th>Action</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr>
            <td>Verify your email id</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Update your user profile</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Join 3 communities</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Create your first post</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Gain 10 upvotes</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Create/Bookmark an event</td>
            <td>10</td>
          </tr>
         
        </tbody>
      </table>
    </div>
  )
}

export const Achievements = () => {
  const thStyle = {
    background: "243C4B",
    color: "eee"
  }

  return (
    <div style={{margin: "-1.2em"}}>
      <table className="table achievements">
        <thead>
          <th>Action</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr>
            <td>Contribute Your First case study</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Contribute 5 case studies</td>
            <td>250</td>
          </tr>
          <tr>
            <td>Contribute 10 case studies</td>
            <td>500</td>
          </tr>
          <tr>
            <td>Create 10 posts</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Create 25 posts</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Create 50 posts</td>
            <td>150</td>
          </tr>
          <tr>
            <td>Create 100 posts</td>
            <td>250</td>
          </tr>
          <tr>
            <td>Create 5 calendar entries</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Create 10 calendar entries</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Create 25 calendar entries</td>
            <td>125</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}