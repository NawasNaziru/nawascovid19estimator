const xml = require('xml');

export const covid19ImpactEstimatorXML = (req, res) => {
  try{
  let impact = {};
  let severeImpact = {};
  
  impact.currentlyInfected = parseInt(req.body.reportedCases) * 10;
  severeImpact.currentlyInfected = parseInt(req.body.reportedCases) * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** 9;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** 9;
  impact.severeCasesByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.15); 
  impact.hospitalBedsByRequestedTime = Math.floor((parseInt(req.body.totalHospitalBeds) * 0.35) - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.floor((parseInt(req.body.totalHospitalBeds) * 0.35) - severeImpact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.02);
  impact.dollarsInFlight = Math.floor(impact.infectionsByRequestedTime * parseInt(req.body.region.avgDailyIncomePopulation) * parseInt(req.body.region.avgDailyIncomeInUSD) * 30);
  severeImpact.dollarsInFlight = Math.floor(severeImpact.infectionsByRequestedTime * parseInt(req.body.region.avgDailyIncomePopulation) * parseInt(req.body.region.avgDailyIncomeInUSD) * 30);
  
  res.set('Content-Type', 'text/xml');
  res.send(xml({
    data: req.body,
    impact: impact,
    severeImpact: severeImpact
  }));
  }
  catch(err){
    res.json(err.message);
 };

};


