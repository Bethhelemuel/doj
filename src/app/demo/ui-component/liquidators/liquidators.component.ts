// angular import
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-liquidators',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './liquidators.component.html',
  styleUrl: './liquidators.component.scss'
})
export class LiquidatorsComponent {
  personalInfoForm: FormGroup;
  businessForm: FormGroup;
  empBusTradingForm: FormGroup;
  businessDetailsOfficeForm: FormGroup;
  qualProMembershipForm: FormGroup;
  disqualRelationshipForm: FormGroup;
  appEmpHistoryForm: FormGroup;
  taxBondBankForm: FormGroup;

  groupOneSection : boolean
  groupTwoSection : boolean
  groupThreeSection : boolean
  groupFourSection : boolean
  groupFiveSection : boolean
  groupSixSection : boolean
  groupSevenSection : boolean
  groupEightSection : boolean

  groupOneSectionText : any
  groupOneSectionCircle : any
  groupOneSectionEdit:boolean
  groupOneSectionValid:boolean

  groupTwoSectionText : string
  groupTwoSectionCircle : any
  groupTwoSectionEdit:boolean
  groupTwoSectionValid:boolean

  groupThreeSectionText : string
  groupThreeSectionCircle : any
  groupThreeSectionEdit:boolean
  groupThreeSectionValid:boolean

  groupFourSectionText : string
  groupFourSectionCircle : any
  groupFourSectionEdit:boolean
  groupFourSectionValid:boolean

  groupFiveSectionText : string
  groupFiveSectionCircle : any
  groupFiveSectionEdit:boolean
  groupFiveSectionValid:boolean
  
  groupSixSectionText : string
  groupSixSectionCircle : any
  groupSixSectionEdit:boolean
  groupSixSectionValid:boolean

  groupSevenSectionText : string
  groupSevenSectionCircle : any
  groupSevenSectionEdit:boolean
  groupSevenSectionValid:boolean

  groupEightSectionText : string
  groupEightSectionCircle : any
  groupEightSectionEdit:boolean
  groupEightSectionValid:boolean


  constructor(private fb: FormBuilder){
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      identityNumber: ['', Validators.required],
      race: ['', Validators.required], 
      gender: ['', Validators.required]
    });

    this.businessForm = this.fb.group({
      businessType: ['', Validators.required],
      businessStatus: ['']
    });

    this.empBusTradingForm = this.fb.group({
      employerName: ['', Validators.required],
      businessTelephone: ['', Validators.required],
      businessAddress: ['', Validators.required],
      firmName: ['', Validators.required],
      partnersOrDirectors: ['', Validators.required],

      businessName: ['', Validators.required],
      businessDetails: ['', Validators.required],
      tradingPartners: ['', Validators.required]
    });
  

    this.businessDetailsOfficeForm = this.fb.group({
      proofOfRental: ['', Validators.required],
      staffDetails: ['', Validators.required],
      numComputers: ['', Validators.required],
      numPrinters: ['', Validators.required],
      additionalInfo: ['', Validators.required],

      provinceOfficeAddress1: ['', Validators.required],
      provinceDetails1: ['', Validators.required],
      provinceOfficeAddress2: ['', Validators.required],
      provinceDetails2: ['', Validators.required],
      provinceOfficeAddress3: ['', Validators.required],
      provinceDetails3: ['', Validators.required],
    });

    this.qualProMembershipForm = this.fb.group({
      qualifications: ['', Validators.required],

      professionalMemberships: ['', Validators.required]
    });
    
    this.disqualRelationshipForm = this.fb.group({
      disqualification: ['', Validators.required],

      relationshipDisclosure: ['', Validators.required],
     // relationshipDisclosureYes: ['', Validators.required],
      relationshipDetails: ['', Validators.required]
    });
    
    this.appEmpHistoryForm = this.fb.group({
      appointmentLocations: ['', Validators.required],

      employmentHistory: ['', Validators.required]
    });
 
    this.taxBondBankForm = this.fb.group({
      taxClearance: ['', Validators.required],

      bankAccountDocumentation: ['', Validators.required],

      declaration: ['', Validators.required]
    });

    this.personalInfoForm.statusChanges.subscribe(() => {
      // Check if the form is invalid and any control is dirty or touched
      if (
        this.personalInfoForm.invalid &&
        Object.keys(this.personalInfoForm.controls).some(
          (key) => 
            this.personalInfoForm.get(key)?.touched || this.personalInfoForm.get(key)?.dirty
        )
      ) {
        this.groupOneSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
        this.groupOneSectionText = "active edit-text"
        this.groupOneSectionValid = false;
      } else if (this.personalInfoForm.valid) {
        this.groupOneSectionEdit = false;
        this.groupOneSectionValid = true; // Show check icon if form is valid
        this.groupOneSectionText = "active valid-text"
      } else {
        this.groupOneSectionEdit = false;
        this.groupOneSectionValid = false;  // Reset to default state
      }
    });
      
  }

  ngOnInit(){
    this.groupOneSection = true
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = "active active-text"
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = "active-circle"
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = ""

    this.groupOneSectionEdit = false
    this.groupOneSectionValid = false

    this.groupTwoSectionEdit = false
    this.groupTwoSectionValid = false

  }


  validateRace(group: FormGroup): { [key: string]: any } | null {
    const hasRaceSelected = Object.values(group.value).some(value => value);
    return hasRaceSelected ? null : { raceRequired: true };
  }

  get f() {
    return this.personalInfoForm.controls
  }

  get g(){
    return this.businessForm.controls
  }

  onSubmit(): void {
    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value);
      this.moveGroupTwoSection()
    } else {
      
      Object.keys(this.personalInfoForm.controls).forEach((controlName) => {
        const control = this.personalInfoForm.get(controlName);
        control?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

businessInfoSubmit(): void{
  if (this.businessForm.valid) {
    console.log(this.businessForm.value);
   this.groupTwoSectionValid = true;
    this.moveGroupThreeSection()
  } 
  else if(this.businessForm.invalid && Object.keys(this.businessForm.controls).some(
      (key) => 
        this.businessForm.get(key)?.touched || this.businessForm.get(key)?.dirty
    )){

      this.groupTwoSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupTwoSectionText = "active edit-text"
      this.groupTwoSectionValid = false;

  }
  else{
    
    Object.keys(this.businessForm.controls).forEach((controlName) => {
      const controlB = this.businessForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}


empBusTradingSubmit(): void{
  if (this.empBusTradingForm.valid) {
    console.log(this.empBusTradingForm.value);
   this.groupThreeSectionValid = true;
    this.moveGroupFourSection()
  } 
  else if(this.empBusTradingForm.invalid && Object.keys(this.empBusTradingForm.controls).some(
      (key) => 
        this.empBusTradingForm.get(key)?.touched || this.empBusTradingForm.get(key)?.dirty
    )){

      this.groupThreeSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupThreeSectionText = "active edit-text"
      this.groupThreeSectionValid = false;

  }
  else{
    
    Object.keys(this.empBusTradingForm.controls).forEach((controlName) => {
      const controlB = this.empBusTradingForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}

businessDetailsOfficeSubmit(): void{
  if (this.businessDetailsOfficeForm.valid) {
    console.log(this.businessDetailsOfficeForm.value);
   this.groupFourSectionValid = true;
    this.moveGroupFiveSection()
  } 
  else if(this.businessDetailsOfficeForm.invalid && Object.keys(this.businessDetailsOfficeForm.controls).some(
      (key) => 
        this.businessDetailsOfficeForm.get(key)?.touched || this.businessDetailsOfficeForm.get(key)?.dirty
    )){

      this.groupFourSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupFourSectionText = "active edit-text"
      this.groupFourSectionValid = false;

  }
  else{
    
    Object.keys(this.businessDetailsOfficeForm.controls).forEach((controlName) => {
      const controlB = this.businessDetailsOfficeForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}

qualProMembershipSubmit(): void{
  if (this.qualProMembershipForm.valid) {
    console.log(this.qualProMembershipForm.value);
   this.groupFiveSectionValid = true;
    this.moveGroupSixSection()
  } 
  else if(this.qualProMembershipForm.invalid && Object.keys(this.qualProMembershipForm.controls).some(
      (key) => 
        this.qualProMembershipForm.get(key)?.touched || this.qualProMembershipForm.get(key)?.dirty
    )){

      this.groupFiveSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupFiveSectionText = "active edit-text"
      this.groupFiveSectionValid = false;

  }
  else{
    
    Object.keys(this.qualProMembershipForm.controls).forEach((controlName) => {
      const controlB = this.qualProMembershipForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}

disqualRelationshipSubmit(): void{
  if (this.disqualRelationshipForm.valid) {
    console.log(this.disqualRelationshipForm.value);
   this.groupSixSectionValid = true;
    this.moveGroupSevenSection()
  } 
  else if(this.disqualRelationshipForm.invalid && Object.keys(this.disqualRelationshipForm.controls).some(
      (key) => 
        this.disqualRelationshipForm.get(key)?.touched || this.disqualRelationshipForm.get(key)?.dirty
    )){

      this.groupSixSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupSixSectionText = "active edit-text"
      this.groupSixSectionValid = false;

  }
  else{
    
    Object.keys(this.disqualRelationshipForm.controls).forEach((controlName) => {
      const controlB = this.disqualRelationshipForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}

appEmpHistorySubmit(): void{
  if (this.appEmpHistoryForm.valid) {
    console.log(this.appEmpHistoryForm.value);
   this.groupSevenSectionValid = true;
    this.moveGroupEightSection()
  } 
  else if(this.appEmpHistoryForm.invalid && Object.keys(this.appEmpHistoryForm.controls).some(
      (key) => 
        this.appEmpHistoryForm.get(key)?.touched || this.appEmpHistoryForm.get(key)?.dirty
    )){

      this.groupSevenSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupSevenSectionText = "active edit-text"
      this.groupSevenSectionValid = false;

  }
  else{
    
    Object.keys(this.appEmpHistoryForm.controls).forEach((controlName) => {
      const controlB = this.appEmpHistoryForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}

taxBondBankSubmit(): void{
  if (this.taxBondBankForm.valid) {
    console.log(this.taxBondBankForm.value);
   this.groupEightSectionValid = true;
    
  } 
  else if(this.taxBondBankForm.invalid && Object.keys(this.taxBondBankForm.controls).some(
      (key) => 
        this.taxBondBankForm.get(key)?.touched || this.taxBondBankForm.get(key)?.dirty
    )){

      this.groupEightSectionEdit = true;  // Show edit icon if form is touched/dirty and invalid
      this.groupEightSectionText = "active edit-text"
      this.groupEightSectionValid = false;

  }
  else{
    
    Object.keys(this.taxBondBankForm.controls).forEach((controlName) => {
      const controlB = this.taxBondBankForm.get(controlName);
      controlB?.markAsTouched();
    });
    console.log('Form is not valid');
  }
}

  generatePDF() { 
    const data = document.getElementById('a4'); // ID of the HTML element to capture

    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208; // A4 size in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size PDF
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('generated-pdf.pdf'); // Save the PDF
      });
    }
  }




  moveGroupTwoSection(){
    this.groupOneSection = false
    this.groupTwoSection = true
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = ""
    this.groupTwoSectionText = "active active-text"
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = "active-circle"
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = ""

  }

  moveGroupThreeSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = true
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = ""
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = "active active-text"
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = "active-circle"
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = ""
  }

  moveGroupOneSection(){ 
    this.groupOneSection = true
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = "active active-text"
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = "active-circle"
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = ""

  }

  moveGroupFourSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = true
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = ""
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = "active active-text"
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = "active-circle"
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = ""
  }

  movebackGroupTwoSection(){
    this.groupOneSection = false
    this.groupTwoSection = true
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false
  }

  moveGroupFiveSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = true
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = ""
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = "active active-text"
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = "active-circle"
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = ""
  }

  movebackGroupThreeSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = true
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false
  }

  moveGroupSixSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = true
    this.groupSevenSection = false
    this.groupEightSection = false

    this.groupOneSectionText = ""
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = "active active-text"
    this.groupSevenSectionText = ""
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = "active-circle"
    this.groupSevenSectionCircle = ""
  }

  movebackGroupFourSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = true
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false
  }

  moveGroupSevenSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = true
    this.groupEightSection = false

    this.groupOneSectionText = ""
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = "active active-text"
    this.groupEightSectionText = ""

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = "active-circle"
    this.groupEightSectionCircle = ""
  }

  movebackGroupFiveSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = true
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = false
  }

  moveGroupEightSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = false
    this.groupEightSection = true

    this.groupOneSectionText = ""
    this.groupTwoSectionText = ""
    this.groupThreeSectionText = ""
    this.groupFourSectionText = ""
    this.groupFiveSectionText = ""
    this.groupSixSectionText = ""
    this.groupSevenSectionText = ""
    this.groupEightSectionText = "active active-text"

    this.groupOneSectionCircle = ""
    this.groupTwoSectionCircle = ""
    this.groupThreeSectionCircle = ""
    this.groupFourSectionCircle = ""
    this.groupFiveSectionCircle = ""
    this.groupSixSectionCircle = ""
    this.groupSevenSectionCircle = ""
    this.groupEightSectionCircle = "active-circle"
  }

  movebackGroupSixSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = true
    this.groupSevenSection = false
    this.groupEightSection = false
  }

  movebackGroupSevenSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = true
    this.groupEightSection = false
  }

  movebackGroupEightSection(){
    this.groupOneSection = false
    this.groupTwoSection = false
    this.groupThreeSection = false
    this.groupFourSection = false
    this.groupFiveSection = false
    this.groupSixSection = false
    this.groupSevenSection = true
    this.groupEightSection = false
  }

  
}
