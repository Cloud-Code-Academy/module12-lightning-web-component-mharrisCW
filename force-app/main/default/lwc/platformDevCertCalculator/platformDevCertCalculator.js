import { LightningElement } from 'lwc';
const devFundWeight = 0.23;
const processAutoWeight = 0.30;
const userInterfaceWeight = 0.25;
const testDebugWeight = 0.22;

export default class PlatformDevCertCalculator extends LightningElement {
    devFundamentalScore = 50;
    processAutomationScore = 50;
    userInterfaceScore = 50;
    testingScore = 50;
    certificationScore = 90;
    numberOfQuestions = 60;
    showResources = false;
    currentHistoryId = 0;

    attemptHistory =[
        {Id: 1, Score: 50},
        {Id: 2, Score: 50},
        {Id: 3, Score: 50}
    ];

    calculateScore(){
        let devFundWeightScore = this.devFundamentalScore * devFundWeight;
        let processAutoWeightScore = this.processAutomationScore * processAutoWeight;
        let userInterfaceWeightScore = this.userInterfaceScore * userInterfaceWeight;
        let testDebugWeightScore = this.testingScore * testDebugWeight;
        this.certificationScore = devFundWeightScore + processAutoWeightScore + userInterfaceWeightScore + testDebugWeightScore;
        this.showResourceIfFailed();
        this.addAttemptHistory(this.certificationScore);

    }

    handleChange(event){
        console.log(event.target.value, event.target.name);
        const inputName = event.target.name;
        let value = Number(event.target.value);
        if(inputName === 'devFundamentals'){
            this.devFundamentalScore = value;
        } else if(inputName === 'processAuto'){
            this.processAutomationScore = value;
        } else if(inputName === 'userInterface'){
            this.userInterfaceScore = value;
        }else if(inputName === 'testDebugDeploy'){
            this.testingScore = value;
        }
    }

    showResourceIfFailed(){
        if (this.certificationScore < 68){
        this.showResources = true;
        } else{
            this.showResources = false;
        }
    }

    addAttemptHistory(Score){
        this.currentHistoryId ++;
        const attempt =
            {
                 Id: this.currentHistoryId, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event){
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt=> attempt.Id !== attemptId);
    }

    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
    }
    
}   