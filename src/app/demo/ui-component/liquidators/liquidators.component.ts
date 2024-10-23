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

  groupThreeSectionText : string
  groupThreeSectionCircle : any

  groupFourSectionText : string
  groupFourSectionCircle : any

  groupFiveSectionText : string
  groupFiveSectionCircle : any

  groupSixSectionText : string
  groupSixSectionCircle : any

  groupSevenSectionText : string
  groupSevenSectionCircle : any

  groupEightSectionText : string
  groupEightSectionCircle : any



  constructor(private fb: FormBuilder){
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      identityNumber: ['', Validators.required],
      race: ['', Validators.required], 
      gender: ['', Validators.required]
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


    


  

   

  }


  validateRace(group: FormGroup): { [key: string]: any } | null {
    const hasRaceSelected = Object.values(group.value).some(value => value);
    return hasRaceSelected ? null : { raceRequired: true };
  }

  get f() {
    return this.personalInfoForm.controls;
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
