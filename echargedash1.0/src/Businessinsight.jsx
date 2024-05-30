// to update
// make sizes respnsive change all hardocded calues to percentages so that it updated with all screens properly


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { BarList } from '@tremor/react';
import { TextInput, Button, Card, CategoryBar, BarList, BarChart, DonutChart, Legend} from '@tremor/react';
import GaugeChart from 'react-gauge-chart'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';



let businessarr=null;
let dataarr=null;

function Businessinsight(){



    
  const[mobileNumber,setMobileNumber]=useState("");
  const[graphvisible,setGraphVisibility]=useState(false);
  const[businessInsightVisible, setBusinessInsightVisible]=useState(true);
  const[riskScore,setRiskScore]=useState(0);
  const[socialScore,setSocialScore]=useState(0);
  const [tempholdingarr, setTempholdingarr] = useState(null);
  const [businessarray, setBusinessArray]= useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [topDivsHeight, setTopDivsHeight] = useState(0);

  


  const fetchData = async () => {
    try {
        const response1 = await fetch('http://localhost:3000/api/getriskscore', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // Add any necessary headers here
            }
        });

        if (!response1.ok) {
            throw new Error('Network response was not ok');
        }

        const data1 = await response1.json();
        dataarr = data1;
        console.log("test dataarr")
        console.log(dataarr);
    } catch (error) {
        console.error("Error fetching getriskscore: ", error);
    }

    try {
        const response2 = await fetch('http://localhost:3000/api/businessinsight', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // Add any necessary headers here
            }
        });

        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }

        const data2 = await response2.json();
        businessarr = data2;
        setBusinessArray(data2);
        console.log("business insight arr");
        console.log(businessarr);
    } catch (error) {
        console.error("Error fetching businessinsight: ", error);
    }
};


useEffect(() => {
    fetchData();
    console.log(businessarr);
    console.log("numbers");
    // fetchbusinessdata();
    const div1Height = document.getElementById("div1").clientHeight;
    const div2Height = document.getElementById("div2").clientHeight;
    const combinedHeight = div1Height + div2Height;
    setTopDivsHeight(combinedHeight);

  }, []); 


  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);

  };



  const findDataByPhoneNumber = (phoneNumber) => {

    


    // const foundData = dataarr.find(item => item.Phone_Number === phoneNumber);
    // if (!foundData) {
    //     console.log("No data found for the provided phone number:", phoneNumber);
    //     setGraphVisibility(false);
    //     setBusinessInsightVisible(true);
    //     return null;
    // } else {
    //     console.log("Data found for the provided phone number:", phoneNumber);
    //     setBusinessInsightVisible(false);
    //     setGraphVisibility(true);
    //     return foundData;
    // }


    // const foundData = dataarr.find(item => item.recordset.Phone_Number === phoneNumber);
    // if (!foundData) {
    //     console.log("No data found for the provided phone number:", phoneNumber);
    //     setGraphVisibility(true);
    //     setBusinessInsightVisible(false);
    //     return null;
    // } else {
    //     console.log("Data found for the provided phone number:", phoneNumber);
    //     setBusinessInsightVisible(false);
    //     setGraphVisibility(true);
    //     return foundData;
    // }


    const foundData = dataarr.recordsets[0].find(item => item.Phone_Number === phoneNumber);
if (foundData) {
    console.log("Data found for the provided phone number:", phoneNumber);
    setBusinessInsightVisible(false);
    setGraphVisibility(true);
    console.log(foundData);
    console.log("founddata");
    return foundData;
} else {
    console.log("No data found for the provided phone number:", phoneNumber);
    setGraphVisibility(false);
    setBusinessInsightVisible(true);
    return null;
}



  };


  const size = {
    width: 250,
    height: 250,
  };


  const windowHeight = window.innerHeight;
  const remainingHeight = windowHeight - topDivsHeight-10;



  const chartStyle = {
  

  }



    return(
<>




        
<div style={{ minHeight: "100%", overflowY: "auto", overflow:'hidden' }}>



<div id="div1" className="flex flex-row " style={{gap:'10px', justifyContent:'flex-end', paddingTop:"10px", paddingRight:"10px"}} >

      
<Button variant="primary" onClick={()=>{
setTempholdingarr(findDataByPhoneNumber(0));

}}  className="bg-blue-500 text-white p-2 rounded-md">Business Overview</Button>



<TextInput value={mobileNumber} onChange={handleMobileNumberChange}  placeholder="enter Mobile number"  className=" max-w-xs "></TextInput>

<Button variant="primary" onClick={()=>{
console.log(mobileNumber);
console.log(dataarr);
setTempholdingarr(findDataByPhoneNumber(mobileNumber));




}} >Search Driver</Button>

</div>


{(businessInsightVisible)?(
<>

<Card id="div2" style={{marginTop:'5px'}}>
<div style={{display:"flex", flexDirection:"row", placeContent:"space-evenly" }}>


<div style={{marginLeft:'50px', marginRight:'0px', marginTop: '5px'}}>

    <p  className=" text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
          <span className="font-bold" >Total No. of Drivers</span>
        </p>
        {(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (

        <p className="font-bold text-center">{businessarr[0]["totaldrivers"][0][""]}</p>
        ):<p>Loading...</p>}

</div>

<div style={{width:'50%', position:"relative", top:"5px"}}>
{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-around">
          <span style={{fontWeight:"bold"}}>{businessarr[0].riskamount.find(item => item.GroupName === "Low risk")?.Count || 0}</span>
          {/* <p style={{ position:'absolute', top:"12px", left:"90px"}}>TEST</p> */}
          <span style={{fontWeight:"bold"}}>{businessarr[0].riskamount.find(item => item.GroupName === "Medium risk")?.Count || 0}</span>
          {/* <p style={{ position:'absolute', top:"12px", left:"310px"}}>TEST</p> */}
          <span style={{fontWeight:"bold"}}>{businessarr[0].riskamount.find(item => item.GroupName === "High Risk")?.Count || 0}</span>
          {/* <p style={{ position:'absolute', top:"12px", right:"90px"}}>TEST</p> */}

        </p>
):<p>Loading...</p>}
<CategoryBar 
            values={[333, 333, 334]}
            showLabels={false}
            colors={['emerald', 'yellow', 'rose']}
          
            
          />

<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-around">
          <span>Low Risk</span>
          {/* <p style={{ position:'absolute', top:"12px", left:"90px"}}>TEST</p> */}
          <span>Medium Risk</span>
          {/* <p style={{ position:'absolute', top:"12px", left:"310px"}}>TEST</p> */}
          <span>High Risk</span>
          {/* <p style={{ position:'absolute', top:"12px", right:"90px"}}>TEST</p> */}

        </p>
</div>



</div>
</Card>


<div className="flex flex-row gap-1 mt-1" style={{height: `${remainingHeight}px`, overflow:'hidden'}}>

{/* <div className="flex flex-col w-1/3"> */}
<div className="flex flex-col w-1/3 " >

<Card style={{height:'33%', maxHeight:'33%'}}>
<div >

<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
<span className="font-bold">Average Social Score</span>
</p>
</>
  
  <>


        {(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (

        <div  className="flex flex-col">

            <div style={{width:'70%', marginLeft:'60px'}} >
         <GaugeChart id="avgsocialscore" 
            
            
            colors={["#ff0000", "rgb(255, 255, 0)","rgb(0, 255, 0)"]}
            nrOfLevels={20}
            percent={(businessarr!==null)?((businessarr[0]["socialscore"][0]["Avg_socialscore"])/1000):(0)}
            hideText
            
            
            />
            </div>

            
      <span style={{marginTop:"-15px"}}  className="font-bold flex justify-center items-center">{(businessarr!==null)?((businessarr[0]["socialscore"][0]["Avg_socialscore"])):(<p className="font-bold text-center">LOADING...</p>)}</span>


      </div> 




      








):(<p className="font-bold text-center">LOADING...</p>)}
</>



</div>


</Card>

<Card style={{height:'33%'}}>



<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold">Social Media Count</span>
        </p>


<>

{(businessarr !== null && businessarr[0]?.acountsfound !== null) ? (


  <>
  <div style={{position:"absolute",left:"100px"}} className="flex flex-row justify-between">
  
 <PieChart


      series={[
        {
          
          data: businessarr[0]["acountsfound"].map(item => ({
            name: item["heading"],
            value: item["amount"],
            
             color: item["heading"] === "Less than 4 accounts" ? "rgb(128, 255, 128)" : item["heading"] === "Between 4 to 8 acocunts" ? "rgb(251, 144, 255)" : item["heading"] === "more than 8 accounts" ? "rgb(86, 252, 255)" : "rgb(255, 0, 0)"

          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '70%',
          
          cy: '10%',
          outerRadius: '130%',
          
          
        },
      ]}

     

      
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />   


<div className=" flex flex-col  mt-4" style={{width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >
  {/* <p>legend</p> */}
  {/* <p style={{color:"rgb(0, 255, 0)"}}> >4 accounts</p> */}

  {/* color: item["heading"] === "Less than 4 accounts" ? "rgb(179, 246, 179)" : item["heading"] === "Between 4 to 8 acocunts" ? "rgb(251, 144, 255)" : item["heading"] === "more than 8 accounts" ? "rgb(128, 253, 255)" : "rgb(255, 0, 0)" */}

  <p style={{fontWeight:'bold' ,color: "rgb(179, 246, 179)"}}><FontAwesomeIcon icon={faSquare} />  &lt;4 accounts</p>
  <p style={{fontWeight:'bold' ,color:'rgb(251, 144, 255)'}}><FontAwesomeIcon icon={faSquare} />  4 to 8 accounts</p>
  <p style={{fontWeight:'bold' ,color:'rgb(128, 253, 255)'}}><FontAwesomeIcon icon={faSquare} />  8 to 12 accounts</p>
  {/* rgb(225, 238, 46) */}
</div>



</div>




</>






):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>




</Card>


<Card style={{height:'33%'}}>
<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
          <span className="font-bold">Top 4 Social Sites</span>
        </p>


<>
{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


<>

<div >
<BarList
data={(businessarr!==null)?(businessarr[0]["totalsocialsites"]):(null)}
/>
</div>



      </>
      ):(<p className="font-bold text-center">LOADING...</p>)}
</>
</>





</Card>
</div>


<div className="flex flex-col w-1/3">

<Card style={{height:'33%'}}>
    

<>
<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold"> Telecom Risk Score

</span>

          
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
    <div style={{position:"absolute",left:"100px"}} className="flex flex-row justify-between">

 
<PieChart


      series={[
        {
          
          data: businessarr[0]["totalriskmodel"].map(item => ({
            name: item["Risk_Model.telecomRisk"],
            value: item["value_count"],
            color: item["Risk_Model.telecomRisk"] === "High" ? "rgb(248, 83, 83)" : item["Risk_Model.telecomRisk"] === "Medium" ? "rgb(255, 255, 121)" : item["Risk_Model.telecomRisk"] === "Low" ? "rgb(80, 247, 80)": null,
            
          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '70%',
          
          cy: '10%',
          outerRadius: '130%',
          

        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    /> 


<div className=" flex flex-col  mt-4" style={{width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >
  {/* <p>legend</p> */}


  {/* color: item["Risk_Model.telecomRisk"] === "High" ? "rgb(248, 83, 83)" : item["Risk_Model.telecomRisk"] === "Medium" ? "rgb(251, 251, 153)" : item["Risk_Model.telecomRisk"] === "Low" ? "rgb(80, 247, 80)": null, */}



  <p style={{fontWeight:'bold' ,color:"rgb(248, 83, 83)"}}><FontAwesomeIcon icon={faSquare} />  High</p>
  <p style={{fontWeight:'bold' ,color:'rgb(251, 251, 153)'}}><FontAwesomeIcon icon={faSquare} />  Medium</p>
  <p style={{fontWeight:'bold' ,color:'rgb(80, 247, 80)'}}><FontAwesomeIcon icon={faSquare} />  Low</p>
  {/* rgb(225, 238, 46) */}
</div>






</div>







</>




):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>












</Card>

<Card style={{height:'33%'}}>
   
   


<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold">Digital Age</span>
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
  <div style={{position:"absolute",left:"100px"}} className="flex flex-row justify-between">
 

  
<PieChart


      series={[
        {
          
          data: businessarr[0]["digitalage"].map(item => ({
            name: item["GroupName"],
            value: item["Count"],
            
             color: item["GroupName"] === "less than 365" ? "rgb(179, 246, 179)" : item["GroupName"] === "Between 365 and 800" ? "rgb(251, 144, 255)" : item["GroupName"] === "greater than 800" ? "rgb(128, 253, 255)" : "rgb(255, 0, 0)"
            //  color: item["heading"] === "Less than 4 accounts" ? "rgb(179, 246, 179)" : item["heading"] === "Between 4 to 8 acocunts" ? "rgb(251, 144, 255)" : item["heading"] === "more than 8 accounts" ? "rgb(128, 253, 255)" : "rgb(255, 0, 0)"

          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '70%',
          
          cy: '10%',
          outerRadius: '130%',
          
          
        },
      ]}

     

      
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />   

<div className=" flex flex-col  mt-4" style={{width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >
  {/* <p>legend</p> */}
  {/* <p style={{color:"rgb(0, 255, 0)"}}> </p> */}
  {/* //  color: item["heading"] === "Less than 4 accounts" ? "rgb(179, 246, 179)" : item["heading"] === "Between 4 to 8 acocunts" ? "rgb(251, 144, 255)" : item["heading"] === "more than 8 accounts" ? "rgb(128, 253, 255)" : "rgb(255, 0, 0)" */}

  <p style={{fontWeight:'bold' ,color: "rgb(179, 246, 179)"}}><FontAwesomeIcon icon={faSquare} />  &lt; 365 days</p>
  <p style={{fontWeight:'bold' ,color:'rgb(251, 144, 255)'}}><FontAwesomeIcon icon={faSquare} />  365-800 days</p>
  <p style={{fontWeight:'bold' ,color:'rgb(128, 253, 255)'}}><FontAwesomeIcon icon={faSquare} />  &gt; 800 days</p>
  {/* rgb(225, 238, 46) */}
</div>



</div>




</>






):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>





</Card>

<Card style={{height:'33%'}}>

<div  style={{marginTop:'-25px'}}>


{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


<div className="flex flex-row justify-between">

<p className="whitespace-nowrap" style={{position:'absolute', left:'10px'}}>Prepaid/Postpaid </p>

<div className="flex flex-row justify-between">

 <PieChart


      series={[
        {
          
          data: businessarr[0]["prepaidPostpaid"].map(item => ({
            name: item["Phone_Network.numberBillingType"],
            value: item["value_count"],
            color: item["Phone_Network.numberBillingType"] === "prepaid" ? "rgb(177, 255, 177)":  "rgb(255, 145, 145)"

          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '40%',
          
          cy: '35%',
          outerRadius: '80%',

        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />  

<div className=" flex flex-col mt-12" style={{position:'absolute', left:'30%', bottom:'30%', marginLeft:'10px'}}  >

{/* <div className="bg-slate-100 flex flex-col  mt-4" style={{position:'absolute', right:'230px', width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >  */}

  {/* <p>legend</p> */}
  <p style={{fontWeight:'bold' ,color: "rgb(172, 255, 183)"}}><FontAwesomeIcon icon={faSquare} />Prepaid</p>
  <p style={{fontWeight:'bold' ,color: "rgb(255, 174, 174)"}}><FontAwesomeIcon icon={faSquare} />Postpaid</p>
</div>
</div>


<div className="flex flex-col">


  {/* the heading */}
<p className="whitespace-nowrap" style={{position:'absolute', right:'10px'}}>Reachable/Non-Reachable </p>



{/* the chart */}
<>


<div style={{position:'absolute', left:'225px'}}>
   
 <PieChart
      

      series={[
        {
          
          data: businessarr[0]["phonereachable"].map(item => ({
            name: item["Phone_Network.isPhoneReachable"],
            value: item["value_count"],
            color: item["Phone_Network.isPhoneReachable"] === "TRUE" ? 'rgb(177, 255, 177)' :  "rgb(255, 145, 145)"

          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '40%',
          
          cy: '35%',
          outerRadius: '80%',

        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />  
    </div>



<div className="  flex flex-col mt-12" style={{position:'absolute', right:'-0.25%', bottom:'30%'}}  >
  {/* <p>legend</p> */}
  <p style={{fontWeight:'bold' ,color: "rgb(172, 255, 183)"}}><FontAwesomeIcon icon={faSquare} />Reachable</p>
  <p style={{fontWeight:'bold',color: "rgb(255, 174, 174)"}}><FontAwesomeIcon icon={faSquare} />Unreachable</p>

</div>


</>

</div>


</div>
):(<p className="font-bold text-center">LOADING...</p>)}


</div>
</Card>
</div>



<div className="flex flex-col w-1/3">

<Card style={{height:'33%'}}>
<>


<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

  <span className="font-bold"> Identity Confidence Score
 
</span>


        </p>
{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (

<div className="flex flex-row justify between">

 
<PieChart
      

      
      series={[
        {
          
          data: businessarr[0]["identityConfidenceScore"].map(item => ({
            name: item["Risk_Model.identityConfidence"],
            value: item["value_count"],
            color: item["Risk_Model.identityConfidence"] === "High" ? "rgb(255, 145, 145)" : item["Risk_Model.identityConfidence"] === "Medium" ? "rgb(255, 246, 175)" : item["Risk_Model.identityConfidence"] === "Low" ? "rgb(177, 255, 177)": null
            // color: item["Risk_Model.telecomRisk"] === "High" ? "rgb(248, 83, 83)" : item["Risk_Model.telecomRisk"] === "Medium" ? "rgb(255, 255, 121)" : item["Risk_Model.telecomRisk"] === "Low" ? "rgb(80, 247, 80)": null,

          
          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '70%',
          
          cy: '10%',
          outerRadius: '130%',

        },
      ]}
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />  








<div className=" flex flex-col  mt-4" style={{width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >
  {/* <p>legend</p> */}


  {/* // color: item["Risk_Model.telecomRisk"] === "High" ? "rgb(248, 83, 83)" : item["Risk_Model.telecomRisk"] === "Medium" ? "rgb(255, 255, 121)" : item["Risk_Model.telecomRisk"] === "Low" ? "rgb(80, 247, 80)": null, */}

  <p style={{fontWeight:'bold' ,color:'rgb(255, 145, 145)'}}><FontAwesomeIcon icon={faSquare} />  High</p>
  <p style={{fontWeight:'bold' ,color:'rgb(255, 246, 175)'}}><FontAwesomeIcon icon={faSquare} />  Medium</p>
  <p style={{fontWeight:'bold' ,color:'rgb(177, 255, 177)'}}><FontAwesomeIcon icon={faSquare} />  Low</p>
  {/* rgb(225, 238, 46) */}



</div>
      

      </div>
):(<p className="font-bold text-center">LOADING...</p>)}



</>
</Card>

<Card style={{height:'33%'}}>
    

<>
<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold"> Phone Name Match

</span>

          
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
    <div className="flex flex-row justify-between">

  
<PieChart
       style={{
        position: "relative", // Add position property
        zIndex: "1000000000000000", // Set a higher z-index value
      }}


      series={[
        {
          
          data: businessarr[0]["namematch"][0].map(item => ({
            name: item["GroupName"],
            value: item["Count"],
            // color: item["GroupName"] === "greater than 66" ? 'rgb(126, 255, 126)' : "rgb(252, 126, 126)",
            color: item["GroupName"] === "greater than 66" ? "rgb(255, 145, 145)" : item["GroupName"] === "Between 33 and 66" ? "rgb(255, 246, 175)" : item["GroupName"] === "less than 33" ? "rgb(177, 255, 177)": "rgb(255, 0, 157)" 



            // color: item["Risk_Model.identityConfidence"] === "High" ? "rgb(255, 145, 145)" : item["Risk_Model.identityConfidence"] === "Medium" ? "rgb(255, 246, 175)" : item["Risk_Model.identityConfidence"] === "Low" ? "rgb(177, 255, 177)": null

            
          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '70%',
          
          cy: '10%',
          outerRadius: '130%',
          

        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />  


<div className=" flex flex-col mt-4" style={{width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >
  {/* <p>legend</p> */}


  {/* // color: item["Risk_Model.identityConfidence"] === "High" ? "rgb(255, 145, 145)" : item["Risk_Model.identityConfidence"] === "Medium" ? "rgb(255, 246, 175)" : item["Risk_Model.identityConfidence"] === "Low" ? "rgb(177, 255, 177)": null */}



  
  <p style={{fontWeight:'bold' , color: "rgb(255, 145, 145)"}}><FontAwesomeIcon icon={faSquare} />  greater than 66</p>
  <p style={{fontWeight:'bold' ,color: "rgb(255, 246, 175)"}}><FontAwesomeIcon icon={faSquare} />  Between 33 and 66</p>

  <p style={{fontWeight:'bold' ,color: "rgb(252, 126, 126)"}}><FontAwesomeIcon icon={faSquare} />  less than 33</p>
  {/* rgb(225, 238, 46) */}
</div>






</div>







</>




):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>













</Card>

<Card style={{height:'33%'}}>
     

<>
<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold"> UPI

</span>

          
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
    <div className="flex flex-row justify-between">



  
<PieChart


      series={[
        {
          
          data: businessarr[0]["upicount"].map(item => ({
            name: item["upi"],
            value: item["count"],
            color: item["upi"] === "Yes" ? 'rgb(255, 145, 145)' : "rgb(177, 255, 177)",
            // color: item["GroupName"] === "greater than 66" ? "rgb(255, 145, 145)" : item["GroupName"] === "Between 33 and 66" ? "rgb(255, 246, 175)" : item["GroupName"] === "less than 33" ? "rgb(177, 255, 177)": "rgb(255, 0, 157)" 

          })),
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 45,
          cx: '70%',
          
          cy: '10%',
          outerRadius: '130%',
          

        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontSize:"15px",
          fontWeight: 'bold',
        },
      }}
      {...size}
    />  


<div className="flex flex-col mt-4" style={{width:'100%', fontSize:'14px', whiteSpace: 'nowrap', overflowX: 'auto'}} >
  {/* <p>legend</p> */}
  <p style={{fontWeight:'bold' ,color: "rgb(255, 145, 145)"}}><FontAwesomeIcon icon={faSquare} />  Has UPI</p>
  <p style={{fontWeight:'bold' ,color: "rgb(177, 255, 177)"}}><FontAwesomeIcon icon={faSquare} />  No UPI</p>
  {/* color: item["upi"] === "Yes" ? 'rgb(255, 145, 145)' : "rgb(177, 255, 177)", */}




  {/* color: item["Risk_Model.identityConfidence"] === "High" ? "rgb(255, 145, 145)" : item["Risk_Model.identityConfidence"] === "Medium" ? "rgb(255, 246, 175)" : item["Risk_Model.identityConfidence"] === "Low" ? "rgb(177, 255, 177)": null */}



  {/*  */}

</div>






</div>







</>




):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>















</Card>
</div>

</div>

</>
):(null)}



{(graphvisible)?(
  <>

<Card id="div2" style={{marginTop:'5px'}}>
<div style={{display:"flex", flexDirection:"row", placeContent:"space-evenly" }}>


<div style={{marginLeft:'50px', marginRight:'0px', marginTop: '5px'}}>

    <p  className=" text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
          <span className="font-bold" >Driver Information</span>
        </p>
        {(tempholdingarr !== null && businessarr[0]?.networksusedresult !== null) ? (

        <p className="font-bold text-center">{tempholdingarr.name}</p>
        ):<p>Loading...</p>}

</div>

<div style={{width:'50%', position:"relative", top:"5px"}}>
{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-around">
          {/* <span style={{fontWeight:"bold"}}>{businessarr[0].riskamount.find(item => item.GroupName === "Low risk")?.Count || 0}</span> */}
          {/* <span style={{fontWeight:"bold"}}>{tempholdingarr["Risk_Model.alternateRiskScore"]<333?({tempholdingarr["Risk_Model.alternateRiskScore"]}):(null)} </span> */}
          {tempholdingarr["Risk_Model.alternateRiskScore"]<333 ? (<span style={{fontWeight:"bold"}}>{tempholdingarr["Risk_Model.alternateRiskScore"]}</span>):(null)}
          {/* <p style={{ position:'absolute', top:"12px", left:"90px"}}>TEST</p> */}
          {/* <span style={{fontWeight:"bold"}}>{businessarr[0].riskamount.find(item => item.GroupName === "Medium risk")?.Count || 0}</span> */}
          {(tempholdingarr["Risk_Model.alternateRiskScore"]>333 && tempholdingarr["Risk_Model.alternateRiskScore"]<666) ? (<span style={{fontWeight:"bold"}}>{tempholdingarr["Risk_Model.alternateRiskScore"]}</span>):(null)}

          {/* <p style={{ position:'absolute', top:"12px", left:"310px"}}>TEST</p> */}
          {/* <span style={{fontWeight:"bold"}}>{businessarr[0].riskamount.find(item => item.GroupName === "High Risk")?.Count || 0}</span> */}
          {(tempholdingarr["Risk_Model.alternateRiskScore"]>=666) ? (<span style={{fontWeight:"bold"}}>{tempholdingarr["Risk_Model.alternateRiskScore"]}</span>):(null)}

          {/* <p style={{ position:'absolute', top:"12px", right:"90px"}}>TEST</p> */}

        </p>
):<p>Loading...</p>}
<CategoryBar 
            values={[333, 333, 334]}
            showLabels={false}
            colors={['emerald', 'yellow', 'rose']}
          
            
          />

<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-around">
          <span>Low Risk</span>
          {/* <p style={{ position:'absolute', top:"12px", left:"90px"}}>TEST</p> */}
          <span>Medium Risk</span>
          {/* <p style={{ position:'absolute', top:"12px", left:"310px"}}>TEST</p> */}
          <span>High Risk</span>
          {/* <p style={{ position:'absolute', top:"12px", right:"90px"}}>TEST</p> */}

        </p>
</div>



</div>
</Card>


<div className="flex flex-row gap-1 mt-1" style={{height: `${remainingHeight}px`, overflow:'hidden'}}>

{/* <div className="flex flex-col w-1/3"> */}
<div className="flex flex-col w-1/3 " >

<Card style={{height:'33%', maxHeight:'33%'}}>
<div >

<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
<span className="font-bold"> Driver Social Score</span>
</p>
</>
  
  <>


        {(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (

        <div  className="flex flex-col">

            <div style={{width:'70%', marginLeft:'60px'}} >
         <GaugeChart id="avgsocialscore" 
            
            
            colors={["#ff0000", "rgb(255, 255, 0)","rgb(0, 255, 0)"]}
            nrOfLevels={20}
            percent={(tempholdingarr!==null)?((tempholdingarr['Risk_Model.socialFootprintScore'])/1000):(0)}
            hideText
            
            
            />
            </div>

            
      <span style={{marginTop:"-15px"}}  className="font-bold flex justify-center items-center">{(businessarr!==null)?((tempholdingarr['Risk_Model.socialFootprintScore'])):(<p className="font-bold text-center">LOADING...</p>)}</span>


      </div> 




      








):(<p className="font-bold text-center">LOADING...</p>)}
</>



</div>


</Card>

<Card style={{height:'66%'}}>



<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold">Social Media 
          </span>
        </p>


<>

{(businessarr !== null && businessarr[0]?.acountsfound !== null) ? (


  <>
 
  
 
  {/* <div className="flex flex-col mt-4" style={{ width: '100%', fontSize: '14px', whiteSpace: 'nowrap', overflowX: 'auto' }}>
      <p>Names:</p>
      <div className="flex flex-wrap">
        {(tempholdingarr["Phone_Social_Premium.amazon"]==="Account Found")?
        (<p>Amazon</p>):(null)}
      </div>
    </div> */}


<div className="flex flex-col mt-4" style={{ width: '100%', fontSize: '14px', whiteSpace: 'nowrap', overflowX: 'auto' }}>
      
      <div className="flex flex-wrap flex-row gap-4">
        {tempholdingarr && (
          <>
            {tempholdingarr["Phone_Social_Premium.amazon"] === "Account Found" && <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAAC+CAMAAAARDgovAAABUFBMVEX///8BAQEAAAD+mQD8/Pz///3//v/9mgAFBQWIiIj///v5+fn8mwD/lwD8///19fXa2tr/lADo6Oj5//nFxcVJSUn9//X4lgCysrIlJSWmpqbU1NRhYWF8fHzw8PD6/f/9/+0dHR1paWmpqamWlpb4//TLy8s1NTUUFBSSkpJUVFSDg4NDQ0PBwcH/+f/vlgArKyvrmgD2/+3/jwDv+//1nADx//fqjwD9++H+9enqpCtbW1tmZmY6Ojr18c/05bPw1JXuwHjyt2zqwob5673r/+//5sbxxX7usUXrmCb0rFHv0Irnx3Dcph3RmTbz5qH98dzkrU7RpjfmnDXit0bUlBv18cfhnAbnu2XpxnD63Kf127nvyp7n1Kf98b/vmzzs14jiv3fzxG3//ND0xl/20Zf746HhxVXfr1TztF/467D2wHznpiPqzIz6qFDdunQgrAHJAAAUDElEQVR4nO1d+0PaWNqOySFgEiIQTSwqSVW0FyUNEAh2itphrOhMV9eOWDvruuvoaLe73///2/e+J2BRyfEKGsrTwZFLJOc57/28J+G4AQYYYIABBhhggAEGGGCAAQYY4IcD4QjxH+fP6Wv+7z8miEy+D/3HI0FOzY3PTr2af877iD1bmH6ZnksBE4T0PR10lPD/kbnZV8/4cwzxbXj2Nj0xQuWkn8WDqkEi/arFwBByEMP/Dw3F4MlQi5Pp8Qwny3IfU8Gl0vNUFQBDTQouAF7FNwCTc/Jjn2xXALIAA5v7qakNdP47gvffQTLezMBBcr/ZDBzP6BgIQwABHQgBMp7PcH3GBDqDxBhVihsyAVxQLZmf4/rKWhAiDyMPvpW8KRVoTHl+uI+8KpG5iWc8tYW3BPUuYxm5f2zn7K0F4pwLOO5Foj8iCxjEFB/oKm4gFkDhRF8oiDzyFif2rkwMUY+a4PqBiTF0GfdhAgzni0zYmQChfosxxK1t5WWpeMWNhNtYEDLN395lXJYJfLx87KHcF+n7qkaTC2oqHnswdwaoRoIf6pho3ZoK1I/wRhVElt/xD8HDEA04J8JrNAlEVNfZiLZo6xrK+MnwqoecYkaVPC1FxPwMvfkbUyhSjz2gu2Pquvg61lbBu0YoQM1mH3s8d0aGmWnQMJp/N/16dvbl1ELML+MxZWghnOoB5m042ErEqLhPj2ZaHx8ZnUbeYoHcYcSeCqfNJCOxQMdBM9PhzMUDUj8xHQ0IzGIo/SjhxoMSL6oICzSp+j7JmGzOMNUpxg+HUj0INxmgHDTqnO54yCIzNOfHQslEsL1EUZnupPEEA5BgIkCWwsnEYpCkg2qMEdJJ5UFD3rEsBZ/pcNDTx+tALwAxUuDcjjOFIoxZGOHmg2QiBhl20IDIyPNgP8rzcz0dw8OAjARZiaZIdOZC5qYZ7oMfD6NMJMAcdPIDsaGOfuMc48FBBc+ne3X6DwiSog7R7whoHw04DubMJhjpa0gzj0me71C/hHEy7CVQlGI5j3CW8MgU355ptgYY498xsweZZSfCGWTKXGZuPD01OdbWPEN7I5jKQbhgJugaafjQtmiVSSUW0y+nx/yOqtlrmspYTLzu/nl3AeTKL8BJYi51XWGWpR1T3TrZ3oF0/LUjgpmI9QMTt8CAiRb6XDtuARYT4bSYdwI4HEYFL5xe9I4YkRn17T5lAjs0idx0JQRCjvHhqcmFNy9Y0XZ/MkEBAUZ6eHqhLQxlrR/2FxPEDz5JJjE+3NbFft5bwFpI7SMmmqqQGJ9aaF8GpKNs/sKs3vUJE/4uhdT45Aufgds07PYRE7ReR1LphaYYxPxe9ds1V/QFE5h2jU76FvHuvZl9wAThRmaeUZW4Ow/hZ4Lah/E3fp3m7jSEnwn0mhNjfl/+vXgIOxO4ID7MP0gvYqiZwPXP1Fhz39ePzYTMzfnbIO/PQ6iZACJmqIW4xWj7MwMjzT0uzLHH/DCruV+U9enQMiHLXPp6iaA2pH0TcR8ygd1C1xDRGvy7yanZ8dG5iUQixShQhJYJOcFSDZp9YPQ9OTPR3ivTdzKBccQz1qjArQINU1f2TPcdE5BzTbH6K1FanqXpRQUuror1HxMQSMSGGJUXnp8dof2Yl5bO+40JCC7fBJcfUCDeBbTm9xsTHIRUgZknepSf5ICdwf3GBOEY3hAkYpJedKQT+osJgiIRbC5j/FjwBQT6iwmO1WyLwVYquHmgv5gg3ARjQDE+zdgc3W9MvGYN6Dmj54z0GxPM8HKW0VgT1NsbUibkBKvTlmUluBTD0oaQCcjGgyeWX2AdyezRDSET06zK02tW19lonzExz2KC2Zqa7i8mGGYP4kvGLg2CV3IJZiJ8HWcJZp2KsStaJgssJpj7IZ4kRpm7uRiug70VnX/by0E8CFi7udhOlLHRBQ6dD931zlhmb4jJxE/MrbN8JmxMvGSOJxEcbLOv0zAUvi1xw0yLORogE3TnLHP9NHxulM1EOkg7ZNJ5F935kfx8b8dxf8wyyzRBl1nxRYK9UDQRsv1PjLQDk/KRjoaCUCvBtBO4Mz9c7mORNZ4Yv9iRCTnw6gTtx4bsahysyApG0/EyK4ReBYzJA+rO23AxwY62h0AoLss4kely8jUigYvJi6G6LCKr8DRELcVlqSAgR3znC09flAo+NhKqS5K/YVJxpcpPRiDMpmvG1wiF73pCZDQJq1LjU5E5XxPFR2aqfZ8xWyz4mTDJRJrdP4INAzPy+XX6M+kX/I0vkAemghGuPzVgDwlbKCCbejE8msqMZBLjU/7+lpu2pcX4NyOPPcAbQ2ativpCEaOOIPbimtaqjgdjJTQkUkGuveQdvThFrO2ODTdnAjnsHKU+SczxbI/4/c3b9+6yS6FPDWT+pibw8qf4ZnNm8OeBifAkYoSwugauoYZnUwFEzIfoQuSyHLv5LSouTjnPbOLEN+dTIWLCvwDgHajAht30YhCJdHfE2xDZSxowLVxjNAOmnF6rabozFTy9MEmIBIJrXWH61kxgxIX3cckEXAwrxtMulHBdJxPb12/HRIwW8hfpxrFFWse7fDi+HSqBoKB3q7iVoUBD+cK/QQXp1ODL01t5hCgRbYHI5NUt8gmeXusq5W88BwWYv5KUxfiFVGjC7AuQCd6x4mZBJHUK2K7a3HoukysbAWL8q/BkXheBsxvgBDowAU6jrbGCYBGrnQl4e4qEUyLQUsgybn+6bj8cLdLw/Kv2S101LzB8/hFseOdCffs8wk3MX7MVzFeM2PjlUVIq/CNRYsbDfa8fWnxNx/jAJR3eDxKez3a4ZYtMi5vNO03OhVUzWqCqnUk/u1qO8UdISxTzMyNXtnn4N56klf/mjbDYTEQoLr3y4MO5J3AIi9PtdyLAXLO1H/Ddy4mgS8BBLJmgRa1m/ZcFKSIB2vjA50+QChiGPDo72X5lHpjt+cmXiymugzi0HZiZffvTzPUWIqJRSBR4Z1JCdL1bTERQ4O50JLpTavblTGJucRyxODqRynD+xrngYbbe6uwz6OzDA0+KIA8lTaeQKRXdY0KKiHo2IqpEFO/8N8iVJ9dMNksYJE3lxIgk6pJqmrIMNEh6E8BKVstJqiZK0p0nkIGIiCSI92DiKu7hEEQ8ExG5MLW8V11eWX3v4+fj/VrVs8yiqkfQWDw0E5JlSaKmUSKegilCU5DNauov+crah3W7XDaEuBA1ooZRSBp2fWPTy2sW6YZMiFpWM4sliYhdELc7gES0bFbXK19+/c2BwQMLiiv4iEajgmF//Julm92QiZypVb9sWRbVzof903cC0fJmrrK/XS67imEYioIUKAr8B4gKQtxY94pSV7RDr/69sbPv5YGJh7QUdwUxTe/wU8NFDkAG6CMOoD/igqLEna1iRe8CE5q59bvrOuvLVkU0JbBUl4O6ngIDJ++zYysgDwoqgwBEGMk4CkdcMOJxEA5ntyjrXbATqub9XFYK8cZZLQ/WAm3nw37BrQBMeL82jKRhuK4NymFTOLYrFArxpq2wD7Tu2AndqvzHBuOsNPZqlqSB6XxELoCJrZ0y+Iilvc+bm8f7X9aq8O/Llz/eNxwhKbigMYJR01StC0zoEMlIKw3XVZRCfW+tAiEdBIiPpR/AhL67XKtaNI5qxtl6XlPFrX/UDcF1QUOMXVXrChOE04rZlSUXZDGarK8e5EsQ1cEXPUq2jHbCzEkQUJimSFQpq4FPhZBS14m4ZyejSlxR6l5R74bFVCMkkje12j8LcbBSUdc5q1mWLsl09aHnthOY0LKEwJTr8BBJTsaQU5JUlUhf6/G4EVfcjSwy0ZVoGxjX1K0zQ3Ft9FXl7X1LkyUpRySI/cVcToz00nLAl8LXSRHQUVWTLUnNmirIp8hVnbgL3sP9WdWlLqmvhClOKX9sFwQnnjQEo7x9Ui0VTUmPqGpEAnXtqQkVqWioqmrCHFm5nGaqKr5ac5Kgwkl7H5jozglR3ZSyRXW/bqAfB7MklHc+HHgYduo4Q70lApIvLRJBKjh993B19atOZIxxvjpJwXDjTk3V1C4ZMfga1ZQlTd89LShuXHHAWSWT9ul+1ZKLxaIpEzyrXgHyDhDCnKla1a//Wmq4duNEkgj8O7TjQtJJfvRErYtnAzMfAX/qrZYbLjKvCGA/y+ubu1a29Es+r/ry2QOAhciW0Hvq1c11mBIlXrD3fGf6CaLOgmt81kUt0sVzUYsRopFc9sQBGjC+d120oM765poMSZra9azk3ASqIIZ6dfmsXsYI2zWSzq+UCX0Jziwp2CdE1Eg3z0WNiCpYp2x1r2FQJqJxcN8Qx9TfH69JYDrFHBgMZIRrVlkf5GtFLAagaUB7pKmmqWX16sm/l5wkTAQmYXFjexdkxNPWIBlxo8mlLVUXu17UFSXNlI8OP4KBdkEgDMh+IBW2nW+fDnctrQQxDoZ9+OPBFBX0DmecSPhnwVvoVu3zesNWjKgBP4RkofxnraLJlbz5RxmT8+ReRdVzmvRQ3x90WloWJsU62KujB3FBLOL4iCeThrO9UstnsxL1uJoumdzdQ5tIW9UeA6dcTspDTKlpsnfy55JjQ+6JKQamoG792NN0jVhybk/BVBSUw+yBTEBoQbgSnNDXbQfSX0GgiXASuCgUCnZ94/1+VQcBhkA4R+iIVO6CcNCnHR1c24sQorQxAVoBATUkO5Z3sLKx4zjgw0E5sSwB0+Cs14iJTl7PbTWiMCn2+hG8IHY/9kWFhZBf0r3Nug3+w8BqSVRx0Yhjjuz8frq5VvUgCcCRqE20Rqiyna3Y+lDEX7+gL5mmWtTy3to//rXdcCBuAoBCumi14/bHw2q2ZEk50ZS4k7JgCEJjRRdpYbvLwGiGBv5mTkfLmfRLiDhFaL4UnCej7GxvLlcrEhbh/dETCvxNVjuHwRF/nwN+RsOvoCbXBA8AAb21tvLvdcexwTYqzSpdVEiCNNp7Va1IIFUmoiRbfxWiYDLXj4rwrEshZvsJ+z8lrKuq1v6GjdYCTg5tRbxVWAUybGfp9PNJDWSDyDlwOJquVyqUFwJWlcNZQ+fSHDEVhCygVMKfYHkhwTOJplnVg6+Hn741HBu9BCoFVusEzL3hO7a/ellNjaBXU0Vta0kAopwV3SSkl3khlgksTd/fwdzPxdOLx4VzRLHSCnTUN/Y2T468PERCMNeVCthSiaCvjVBD2ITPCJoXeSRHoWUt7+jgZHVvve6UfY1oVitp+RqfNv5+XIX0PNc6HW3FhuzLPa1Crt7TcgGcPDHNklX9Y6MMNjPqG7AmD/gjWSgkwcKjeNR3zlZXlnernpf/pVTSUMO0Nio43zJANKJlkYGjg68rH/a2l5ADQ4hHsVrp123xG1D8QC92No/AY0uybxDAuVvrSTcZ/73WzTg7iAlaLyqVvJUdiPUgrsDzFlr6AWYd1QaEA2fQKJfLtr2zjQW3/dpadWvLs9pQQVQPllc+/OdsfQkosKkc0Cqt4vqgTBhgJODvOb9tVnWzlLUsXfeZyKnVctKOl/esYq9LSBEaN2BqrOWrK+vg4nERSmiDP4d0EULBZ+jiDFqCdZx6fQewDtjY2dlY+vbtW6Ph4N/A0aNTpgpGtcGv3YPURaNU58BN7Xw4QmXzdYyjhla0PsCB7vauaOo9rh35qg1STURZzXon23WIrs4tBfhVhfoTxfCXIpAIAx9x1HkYaiGJytN8BkdAbAi/0AWcaFTxS9QtvWj9UQUdtb2971mmiX0TGOAjE2AYtOqSYSe/fS2BjektEX4YiFOCkkFUzVtb3TGSUX/lBbIRtB10dYpKRjT6XVDoEJWm2CsXEVWi38lEPgUQEBfzXgFdh1Gun+17OsTcvqH1g1isFJWO645SX/ZAUHptJ84BIaBEwHia1u5/T21qGkCpBZxXHIhwBTjTTS4uANQrqnxnomkfaQQlRMEtRO3Gx+MDTwN/cbHzAptJ8v+LK+UTS5fBPz8WE34zD0GDoXsnn39zjCS1ka6/WNmBCR+d31AuvpTEhR1MfF3Xrp/+rapD8pEj0uUz0DSvbtSP8xq2eDweE1RNJFr2V0vZ6srp7+BWwQpQvQ5komUIfbQihYsEgY0FStES241Ph9UK7RkRI3r20hlgXvJ/f32taNQnPxoTPvygOqKLppo/OvnrNydZQGnvNPUtyfcpaD4TOusRuGa3bCydruyCVhRN0SypTSvZBmonLK8EGaj4BBobRBo9W7gQQiSrurz6EeKiDqM7l4l2TTnH5c8aRn1j9aRmadiwZUHijfH65SIhlYmclC3qT6MDMYKdgDSLEEVwcrq3/N/tOsRTCgzHwCDLiPr+1LeP30WCEuC/gr4FVMF1bBQSw/726fDAw24qVST4twn1GFfGil8M1kN9ZL24ApHzF01NqVKt/XG2U4eIEUOHKF3apiEnJtZ+4IhJk0KdBLJFpQjSigJmcHuHtUpFumHJ/Em0uAQgoks65JVWZWv/wylmk7ZBo4yk0kzfz90F+Avgg9KE0uPsbLz/eX9ty6KVQK1bazg9hCzLYDJ+KRVN3TraXV5ZPdtB+cARw/jj7c6DSknZaexsv/+wsly1NMjTTMkCLq7axxBC9QsuEVPFvlHsEbO8am355MPq3t7Z2dI51tf/3Pv8efN4GRsIsd5AaxYieCK64Nr10mzXQSMuGBFEgKpIE9cI1mlA2jVQGd07B/ob3bLQLpp+fQuL+qqk4fIzGuHHHsm90azCSJpE14REEe0oLvBT9cfGYhn7jLFgEWl2nYv4IchmziuZkafR49YVEE5qQ7P9XAz3Zpa7ocWEX+OVaHvQD0dCE/5SRqvR4NFy6AGeHK5uWvpRMWBigAEGGGCAAQboH/w/mogS7dEl5hYAAAAASUVORK5CYII=" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.byjus"] === "Account Found" && <img src='data:image/png;base64,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' alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.flipkart"] === "Account Found" && <img src="data:image/jpeg;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.housing"] === "Account Found" && <img src="https://c.housingcdn.com/demand/s/client/common/assets/housing.820bbe77.png" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.indiamart"] === "Account Found" && <img src="data:image/png;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.instagram"] === "Account Found" && <img src="data:image/jpeg;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.jeevansaathi"] === "Account Found" && <img src="data:image/jpeg;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.jiomart"] === "Account Found" && <img src="data:image/png;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.paytm"] === "Account Found" && <img src="data:image/png;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.shaadi"] === "Account Found" && <img src="data:image/png;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.swiggy"] === "Account Found" && <img src="data:image/jpeg;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.whatsapp"] === "Account Found" && <img src="data:image/png;base64,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" alt="amazon" width={50} height={50}/>}
            {tempholdingarr["Phone_Social_Premium.yatra"] === "Account Found" && <img src="data:image/png;base64,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" alt="amazon" width={50} height={50}/>}
          </>
        )}
      </div>
    </div>









</>






):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>




</Card>








</div>


<div className="flex flex-col w-1/3">

<Card style={{height:'33%'}}>
    

<>
<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold"> Telecom Risk Score

</span>

          
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
   <div style={{position:"absolute",left:"100px"}} className="flex flex-row justify-between">
 

 <div className="flex flex-row justify-start">


 

{(tempholdingarr["Risk_Model.telecomRisk"] === "Medium") ? (<h1 style={{ color: "rgb(248, 248, 67)" }}>MEDIUM</h1>) :
  (tempholdingarr["Risk_Model.telecomRisk"] === "High") ? (<h1 style={{ color: "rgb(248, 83, 83)" }}>HIGH</h1>) :
    (tempholdingarr["Risk_Model.telecomRisk"] === "Low") ? (<h1 style={{ color: 'rgb(80, 247, 80)' }}>Low</h1>) : (null)}






</div>
</div>






</>




):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>












</Card>

<Card style={{height:'33%'}}>
   
   


<>
<p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold">Digital Age</span>
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
  <div style={{position:"absolute",left:"100px"}} className="flex flex-row justify-between">
 

  <div className="flex flex-row justify-start">

 

{(tempholdingarr["Phone_Name_Attributes.digitalage"] < 365 ) ? (<h1 style={{ color: "rgb(0, 255, 0)" }}>&lt; 365 days</h1>) :
  (tempholdingarr["Phone_Name_Attributes.digitalage"] >=365 && tempholdingarr["Phone_Name_Attributes.digitalage"] <= 800) ? (<h1 style={{ color:'rgb(249, 72, 255)' }}>365-800 days</h1>) :
    (tempholdingarr["Phone_Name_Attributes.digitalage"] >800) ? (<h1 style={{ color: 'rgb(50, 54, 255)' }}>&gt; 800 days</h1>) : (null)}






</div>

  





</div>




</>






):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>





</Card>

<Card style={{height:'33%'}}>

<div  style={{marginTop:'-25px'}}>


{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


<div className="flex flex-row justify-between">

<p className="whitespace-nowrap" style={{position:'absolute', left:'10px'}}>Prepaid/Postpaid </p>

<div className="flex flex-row justify-start">




{/* {(tempholdingarr["Phone_Network.isPhoneReachable"]==="TRUE")?(<h1 style={{position:'absolute',color: "rgb(126, 255, 126)", paddingTop:"30px", fontSize:'24px',right:'100px'}}>Reachable</h1>):(<h1 style={{position:'absolute', color: "rgb(252, 126, 126)", paddingTop:"30px", fontSize:'24px', right:'100px'}}>Unreachable</h1>)} */}



 {(tempholdingarr["Phone_Network.numberBillingType"]==="prepaid")?(<p style={{position:'absolute',color: "rgb(126, 255, 126)", paddingTop:"30px", fontSize:'24px',left:'50px'}}>PREPAID</p>):(<p style={{position:'absolute', color: "rgb(252, 126, 126)", paddingTop:"30px", fontSize:'24px', left:'50px'}}>Postpaid</p>)}

</div>


<div className="flex flex-col">


  {/* the heading */}
<p className="whitespace-nowrap" style={{position:'absolute', right:'10px'}}>Reachable/Non-Reachable </p>



{/* the chart */}
<>


<div>
   
 
{(tempholdingarr["Phone_Network.isPhoneReachable"]==="TRUE")?(<h1 style={{position:'absolute',color: "rgb(126, 255, 126)", paddingTop:"30px", fontSize:'24px',right:'50px'}}>Reachable</h1>):(<h1 style={{position:'absolute', color: "rgb(252, 126, 126)", paddingTop:"30px", fontSize:'24px', right:'50px'}}>Unreachable</h1>)}



</div>


</>

</div>


</div>
):(<p className="font-bold text-center">LOADING...</p>)}


</div>
</Card>
</div>



<div className="flex flex-col w-1/3">

<Card style={{height:'33%'}}>
<>


<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

  <span className="font-bold"> Identity Confidence Score
 
</span>


        </p>
{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


<div style={{position:"absolute",left:"120px", marginLeft:'20px'}} className="flex flex-row justify-between">
 




{/* <div className="flex flex-row justify between"> */}

 

<div className="flex flex-row justify-start">

 

{(tempholdingarr["Risk_Model.identityConfidence"] === "Medium") ? (<h1 style={{ color: "rgb(248, 248, 67)" }}>MEDIUM</h1>) :
  (tempholdingarr["Risk_Model.identityConfidence"] === "High") ? (<h1 style={{ color: 'rgb(80, 247, 80)' }}>HIGH</h1>) :
    (tempholdingarr["Risk_Model.identityConfidence"] === "Low") ? (<h1 style={{color: "rgb(248, 83, 83)"  }}>Low</h1>) : (null)}






</div>








      

      </div>
):(<p className="font-bold text-center">LOADING...</p>)}



</>
</Card>

<Card style={{height:'33%'}}>
    

<>
<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold"> Phone Name Match

</span>

          
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
  <div style={{position:"absolute",left:"100px"}} className="flex flex-row justify-between">
 




 {/* <div className="flex flex-row justify between"> */}
 
  
 
 <div className="flex flex-row justify-between">
 
  
 
 
 
 {(tempholdingarr["Phone_Name_Attributes.digitalage"] < 33 ) ? (<h1 style={{ color: "rgb(248, 83, 83)" }}>&lt; 365 days</h1>) :
  (tempholdingarr["Phone_Name_Attributes.digitalage"] >=33 && tempholdingarr["Phone_Name_Attributes.digitalage"] <= 66) ? (<h1 style={{ color:'rgb(248, 248, 67)' }}>365-800 days</h1>) :
    (tempholdingarr["Phone_Name_Attributes.digitalage"] >66) ? (<h1 style={{ color: 'rgb(80, 247, 80)' }}>&gt; 800 days</h1>) : (null)}


 
 
 
 </div>

 
       </div>

</>




):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>













</Card>

<Card style={{height:'33%'}}>
     

<>
<p  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">

          <span className="font-bold"> UPI

</span>

          
        </p>


<>

{(businessarr !== null && businessarr[0]?.networksusedresult !== null) ? (


  <>
   
   <div className="flex flex-row justify-between">
 
 
  
 
 <div className="flex flex-row justify-between">

<h1 style={{fontSize:"24px", paddingTop:'10px'}}>{tempholdingarr["Phone_to_Name.vpa"]}</h1>



</div>
</div>




</>




):(<p className="font-bold text-center">LOADING...</p>)}

</>
</>















</Card>
</div>

</div>

</>
):(null)}



</div>




        
        
</>
    );
}

export default Businessinsight;