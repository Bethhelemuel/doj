// angular import
import { ChangeDetectorRef, Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiquidatorApplicationService } from 'src/app/services/liquidator-application.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, switchMap } from 'rxjs';

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
  businessAdressDetailsForm: FormGroup;
  qualProMembershipForm: FormGroup;
  disqualRelationshipForm: FormGroup;
  appEmpHistoryForm: FormGroup;
  taxBondBankForm: FormGroup;

  group1Section: boolean;
  group2Section: boolean;
  group3Section: boolean;
  group4Section: boolean;
  group5Section: boolean;
  group6Section: boolean;
  group7Section: boolean;
  group8Section: boolean;

  group1SectionText: any;
  group1SectionCircle: any;
  group1SectionEdit: boolean;
  group1SectionValid: boolean;

  group2SectionText: string;
  group2SectionCircle: any;
  group2SectionEdit: boolean;
  group2SectionValid: boolean;

  group3SectionText: string;
  group3SectionCircle: any;
  group3SectionEdit: boolean;
  group3SectionValid: boolean;

  group4SectionText: string;
  group4SectionCircle: any;
  group4SectionEdit: boolean;
  group4SectionValid: boolean;

  group5SectionText: string;
  group5SectionCircle: any;
  group5SectionEdit: boolean;
  group5SectionValid: boolean;

  group6SectionText: string;
  group6SectionCircle: any;
  group6SectionEdit: boolean;
  group6SectionValid: boolean;

  group7SectionText: string;
  group7SectionCircle: any;
  group7SectionEdit: boolean;
  group7SectionValid: boolean;

  group8SectionText: string;
  group8SectionCircle: any;
  group8SectionEdit: boolean;
  group8SectionValid: boolean;
  userRole: any;

  section1Details: any;
  applicationId: any;
  section2Details: any;
  sectionDetails: any;
  section3Details: any;
  section4Details: any;
  section5Details: any;

  constructor(
    private fb: FormBuilder,
    private liquidatorApplicationService: LiquidatorApplicationService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.businessDetailsOfficeForm = this.fb.group({
      proofOfRental: ['', Validators.required],
      staffDetails: ['', Validators.required],
      numComputers: ['', Validators.required],
      numPrinters: ['', Validators.required],
      additionalInfo: ['', Validators.required]
    });

    this.businessAdressDetailsForm = this.fb.group({
      provinceOfficeAddress1: ['', Validators.required],
      provinceDetails1: ['', Validators.required],
      provinceOfficeAddress2: ['', Validators.required],
      provinceDetails2: ['', Validators.required],
      provinceOfficeAddress3: ['', Validators.required],
      provinceDetails3: ['', Validators.required]
    });

    this.qualProMembershipForm = this.fb.group({
      qualifications: ['', Validators.required],

      professionalMemberships: ['', Validators.required]
    });

    this.disqualRelationshipForm = this.fb.group({
      disqualification: ['', Validators.required],

      relationshipDisclosure: ['', Validators.required],

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
  }

  ngOnInit() {
    this.initialiseSection1();
    this.initialiseSection2();
    this.initialiseSection3();
    // Initialize section states and activate the first section
    this.initializeSections();
    this.setActiveSection(1); // Activates group one by default

    // Retrieve and decode the user's role
    this.userRole = this.authService.decodeToken();
    this.getAppication();

    const savedSection1Details = localStorage.getItem('section1Details');
    const savedSection2Details = localStorage.getItem('section2Details');
    const savedSection3Details = localStorage.getItem('section3Details');

    const savedSection4Details = localStorage.getItem('section4Details');
    const savedSection5Details = localStorage.getItem('section5Details');

    this.applicationId = localStorage.getItem('applicationId');

    if (savedSection1Details) {
      this.group1SectionText = 'active valid-text';
      this.cdr.detectChanges();
      this.section1Details = JSON.parse(savedSection1Details);
      this.patchPersonalInfoForm(); // Patch the form with saved data
      this.moveGroupTwoSection();
    }

    if (savedSection2Details) {
      this.group2SectionText = 'active valid-text';
      this.cdr.detectChanges();
      this.section2Details = JSON.parse(savedSection2Details);
      this.patchVerificationBusiness(); // Patch the form with saved data
      this.moveGroupThreeSection();
    }

    if (savedSection3Details) {
      this.group3SectionText = 'active valid-text';
      this.cdr.detectChanges();
      this.section3Details = JSON.parse(savedSection3Details);
      this.patchempBusTrading();
      this.moveGroupFourSection();
    }

    if (savedSection4Details && savedSection5Details) {
      this.group3SectionText = 'active valid-text';
      this.cdr.detectChanges();
      this.section4Details = JSON.parse(savedSection4Details);
      this.section5Details = JSON.parse(savedSection5Details);
      this.patchbusinessDetailsOffice()
      this.moveGroupFourSection();
    }
  }

  initialiseSection1() {
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
          (key) => this.personalInfoForm.get(key)?.touched || this.personalInfoForm.get(key)?.dirty
        )
      ) {
        this.group1SectionEdit = true; // Show edit icon if form is touched/dirty and invalid
        this.group1SectionText = 'active edit-text';
        this.group1SectionValid = false;
        this.cdr.detectChanges();
      } else if (this.personalInfoForm.valid) {
        this.group1SectionEdit = false;
        this.group1SectionValid = true; // Show check icon if form is valid
        this.group1SectionText = 'active valid-text';
        this.cdr.detectChanges();
      } else {
        this.group1SectionEdit = false;
        this.group1SectionValid = false; // Reset to default state
        this.cdr.detectChanges();
      }
    });
  }

  initialiseSection2() {
    this.businessForm = this.fb.group(
      {
        businessType: [''],
        businessStatus: ['']
      },
      { validators: this.mutuallyExclusiveValidator('businessType', 'businessStatus') }
    );

    // Listen for changes in businessType and clear businessStatus if businessType is filled
    this.businessForm.get('businessType')?.valueChanges.subscribe((value) => {
      if (value) {
        this.businessForm.get('businessStatus')?.setValue(''); // Clear businessStatus
      }
      this.businessForm.updateValueAndValidity(); // Revalidate the form
    });

    // Listen for changes in businessStatus and clear businessType if businessStatus is filled
    this.businessForm.get('businessStatus')?.valueChanges.subscribe((value) => {
      if (value) {
        this.businessForm.get('businessType')?.setValue(''); // Clear businessType
      }
      this.businessForm.updateValueAndValidity(); // Revalidate the form
    });

    // Force an initial validation to ensure form is invalid by default
    this.businessForm.updateValueAndValidity();

    this.businessForm.statusChanges.subscribe(() => {
      // Check if the form is invalid and any control is dirty or touched
      if (
        this.businessForm.invalid &&
        Object.keys(this.businessForm.controls).some((key) => this.businessForm.get(key)?.touched || this.businessForm.get(key)?.dirty)
      ) {
        this.group2SectionEdit = true; // Show edit icon if form is touched/dirty and invalid
        this.group2SectionText = 'active edit-text';
        this.group2SectionValid = false;
        this.cdr.detectChanges();
      } else if (this.personalInfoForm.valid) {
        this.group2SectionEdit = false;
        this.group2SectionValid = true; // Show check icon if form is valid
        this.group2SectionText = 'active valid-text';
        this.cdr.detectChanges();
      } else {
        this.group2SectionEdit = false;
        this.group2SectionValid = false; // Reset to default state
        this.cdr.detectChanges();
      }
    });
  }

  mutuallyExclusiveValidator(businessTypeKey: string, businessStatusKey: string) {
    return (formGroup: FormGroup) => {
      const businessTypeControl = formGroup.controls[businessTypeKey];
      const businessStatusControl = formGroup.controls[businessStatusKey];

      if (!businessTypeControl || !businessStatusControl) {
        return null;
      }

      // Set form as invalid if both fields are empty initially
      if (!businessTypeControl.value && !businessStatusControl.value) {
        formGroup.setErrors({ required: true }); // Set error on the form group itself
        return { required: true };
      }

      // Set mutually exclusive error if both fields are filled
      if (businessTypeControl.value && businessStatusControl.value) {
        businessStatusControl.setErrors({ mutuallyExclusive: true });
        businessTypeControl.setErrors({ mutuallyExclusive: true });
        formGroup.setErrors({ mutuallyExclusive: true });
      } else {
        businessStatusControl.setErrors(null);
        businessTypeControl.setErrors(null);
        formGroup.setErrors(null);
      }

      return null;
    };
  }

  validateRace(group: FormGroup): { [key: string]: any } | null {
    const hasRaceSelected = Object.values(group.value).some((value) => value);
    return hasRaceSelected ? null : { raceRequired: true };
  }

  initialiseSection3() {
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

    this.empBusTradingForm.statusChanges.subscribe(() => {
      // Check if the form is invalid and any control is dirty or touched
      if (
        this.empBusTradingForm.invalid &&
        Object.keys(this.empBusTradingForm.controls).some(
          (key) => this.empBusTradingForm.get(key)?.touched || this.empBusTradingForm.get(key)?.dirty
        )
      ) {
        this.group3SectionEdit = true; // Show edit icon if form is touched/dirty and invalid
        this.group3SectionText = 'active edit-text';
        this.group3SectionValid = false;
        this.cdr.detectChanges();
      } else if (this.personalInfoForm.valid) {
        this.group3SectionEdit = false;
        this.group3SectionValid = true; // Show check icon if form is valid
        this.group3SectionText = 'active valid-text';
        this.cdr.detectChanges();
      } else {
        this.group3SectionEdit = false;
        this.group3SectionValid = false; // Reset to default state
        this.cdr.detectChanges();
      }
    });
  }

  get f() {
    return this.personalInfoForm.controls;
  }

  get g() {
    return this.businessForm.controls;
  }

  getAppication() {
    console.log('application');
    this.liquidatorApplicationService.getApplication(this.userRole.userId).subscribe(
      (application) => {
        if (application) {
          console.log(application);
          this.applicationId = application.application_id;
          localStorage.setItem('applicationId', JSON.stringify(this.applicationId));
          this.getSectionDetails();
          //  this.patchPersonalInfoForm();

          //  this.moveGroupTwoSection();
        }
      },
      (error) => {
        this.toastr.error(error.error?.message, 'Error');
        // Handle error here (e.g., show an error message)
      }
    );
  }

  getSectionDetails() {
    if (this.applicationId) {
      for (let index = 1; index <= 8; index++) {
        this.liquidatorApplicationService.getSectionDetails(this.applicationId, index).subscribe(
          (section) => {
            if (section) {
              console.log(section);
              this.sectionDetails = section;
              localStorage.setItem(`section${index}Details`, JSON.stringify(this.sectionDetails));
              this.patchPersonalInfoForm();

              //  this.moveGroupTwoSection();
            }
          },
          (error) => {}
        );
      }
    }
  }
  PersonalInformationSubmit(): void {
    if (this.personalInfoForm.valid) {
      this.createApplication(this.userRole.userId);
    } else {
      Object.keys(this.personalInfoForm.controls).forEach((controlName) => {
        const control = this.personalInfoForm.get(controlName);
        control?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  editSection() {
    if (this.personalInfoForm.valid) {
      this.liquidatorApplicationService
        .editSection(this.applicationId, 1, {
          full_name: this.personalInfoForm.get('fullName').value,
          identity_number: this.personalInfoForm.get('identityNumber').value,
          race: this.personalInfoForm.get('race').value,
          gender: this.personalInfoForm.get('gender').value
        })
        .subscribe(
          (response) => {
            if (response.statusCode === 200) {
              console.log(response);
              this.section1Details = response.data;
              localStorage.setItem('section1Details', JSON.stringify(this.section1Details));
              this.patchPersonalInfoForm();
              this.toastr.success(response.message, 'Sucess');
              this.moveGroupTwoSection();
            }
          },
          (error) => {
            this.toastr.error(error.error?.message, 'Error');
            // Handle error here (e.g., show an error message)
          }
        );
    } else {
      Object.keys(this.personalInfoForm.controls).forEach((controlName) => {
        const control = this.personalInfoForm.get(controlName);
        control?.markAsTouched();
      });
    }
  }

  editSection2() {
    if (this.businessForm.valid) {
      this.liquidatorApplicationService
        .editSection(this.applicationId, 2, {
          business_type: this.businessForm.get('businessType').value,
          business_status: this.businessForm.get('businessStatus').value
        })
        .subscribe(
          (response) => {
            if (response.statusCode === 200) {
              console.log(response);
              this.section2Details = response.data;
              localStorage.setItem('section2Details', JSON.stringify(this.section2Details));
              this.patchVerificationBusiness();
              this.toastr.success(response.message, 'Sucess');
              this.moveGroupThreeSection();
            }
          },
          (error) => {
            this.toastr.error(error.error?.message, 'Error');
            // Handle error here (e.g., show an error message)
          }
        );
    } else {
      Object.keys(this.businessForm.controls).forEach((controlName) => {
        const control = this.businessForm.get(controlName);
        control?.markAsTouched();
      });
    }
  }

  businessInfoSubmit(): void {
    if (this.businessForm.valid) {
      this.liquidatorApplicationService
        .updateSection(this.applicationId, 2, {
          business_type: this.businessForm.get('businessType').value,
          business_status: this.businessForm.get('businessStatus').value
        })
        .subscribe({
          next: (businessInfo) => {
            console.log(businessInfo);
            if (businessInfo.statusCode === 200) {
              this.section2Details = businessInfo.data;
              localStorage.setItem('section2Details', JSON.stringify(this.section2Details));
              this.patchVerificationBusiness();
              this.toastr.success(businessInfo.message, 'Sucess');
              this.group2SectionValid = true;
              this.cdr.detectChanges();
              //this.moveGroupThreeSection()
            }
          },
          error: (error) => {
            this.toastr.error(error.error?.message, 'Error');
          },
          complete: () => {}
        });

      // this.moveGroupThreeSection();
    } else if (
      this.businessForm.invalid &&
      Object.keys(this.businessForm.controls).some((key) => this.businessForm.get(key)?.touched || this.businessForm.get(key)?.dirty)
    ) {
      this.group2SectionEdit = true;
      this.group2SectionText = 'active edit-text';
      this.group2SectionValid = false;
    } else {
      Object.keys(this.businessForm.controls).forEach((controlName) => {
        const controlB = this.businessForm.get(controlName);
        controlB?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  empBusTradingSubmit(): void {
    if (this.empBusTradingForm.valid) {
      this.liquidatorApplicationService
        .updateSection(this.applicationId, 3, {
          employer_name: this.empBusTradingForm.get('employerName').value,
          business_telephone: this.empBusTradingForm.get('businessTelephone').value,
          business_address: this.empBusTradingForm.get('businessAddress').value,
          firm_name: this.empBusTradingForm.get('firmName').value,
          partners_or_directors: this.empBusTradingForm.get('partnersOrDirectors').value,
          business_name: this.empBusTradingForm.get('businessName').value,
          business_details: this.empBusTradingForm.get('businessDetails').value,
          trading_partners: this.empBusTradingForm.get('tradingPartners').value
        })
        .subscribe({
          next: (employment) => {
            console.log(employment);
            if (employment.statusCode === 200) {
              this.section3Details = employment.data;
              localStorage.setItem('section3Details', JSON.stringify(this.section3Details));
              this.patchVerificationBusiness();
              this.toastr.success(employment.message, 'Sucess');
              this.group3SectionValid = true;
              this.cdr.detectChanges();
              //this.moveGroupThreeSection()
            }
          },
          error: (error) => {
            this.toastr.error(error.error?.message, 'Error');
          },
          complete: () => {}
        });
      //  this.moveGroupFourSection();
    } else if (
      this.empBusTradingForm.invalid &&
      Object.keys(this.empBusTradingForm.controls).some(
        (key) => this.empBusTradingForm.get(key)?.touched || this.empBusTradingForm.get(key)?.dirty
      )
    ) {
      this.group3SectionEdit = true;
      this.group3SectionText = 'active edit-text';
      this.group3SectionValid = false;
    } else {
      Object.keys(this.empBusTradingForm.controls).forEach((controlName) => {
        const controlB = this.empBusTradingForm.get(controlName);
        controlB?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  editSection3() {
    if (this.businessForm.valid) {
      this.liquidatorApplicationService
        .editSection(this.applicationId, 3, {
          employer_name: this.empBusTradingForm.get('employerName').value,
          business_telephone: this.empBusTradingForm.get('businessTelephone').value,
          business_address: this.empBusTradingForm.get('businessAddress').value,
          firm_name: this.empBusTradingForm.get('firmName').value,
          partners_or_directors: this.empBusTradingForm.get('partnersOrDirectors').value,
          business_name: this.empBusTradingForm.get('businessName').value,
          business_details: this.empBusTradingForm.get('businessDetails').value,
          trading_partners: this.empBusTradingForm.get('tradingPartners').value
        })
        .subscribe(
          (response) => {
            if (response.statusCode === 200) {
              console.log(response);
              this.section3Details = response.data;
              localStorage.setItem('section3Details', JSON.stringify(this.section3Details));
              this.patchempBusTrading();
              this.toastr.success(response.message, 'Sucess');
              this.moveGroupFourSection();
            }
          },
          (error) => {
            this.toastr.error(error.error?.message, 'Error');
            // Handle error here (e.g., show an error message)
          }
        );
    } else {
      Object.keys(this.empBusTradingForm.controls).forEach((controlName) => {
        const control = this.businessForm.get(controlName);
        control?.markAsTouched();
      });
    }
  }

  businessDetailsOfficeSubmit(): void {
    console.log(this.businessDetailsOfficeForm)
     console.log(this.businessAdressDetailsForm)
    if (this.businessDetailsOfficeForm.valid && this.businessAdressDetailsForm.valid) {
      alert()
      this.liquidatorApplicationService
        .updateSection(this.applicationId, 4, {
          proof_of_rental: this.businessDetailsOfficeForm.get('proofOfRental').value,
          staff_details: this.businessDetailsOfficeForm.get('staffDetails').value,
          num_computers: this.businessDetailsOfficeForm.get('numComputers').value,
          num_printers: this.businessDetailsOfficeForm.get('numPrinters').value,
          additional_info: this.businessDetailsOfficeForm.get('additionalInfo').value
        })
        .subscribe(
          (response) => {
            if (response.statusCode === 200) {
              console.log(response);
              this.section4Details = response.data;
              localStorage.setItem('section4Details', JSON.stringify(this.section4Details));
              this.liquidatorApplicationService
                .updateSection(this.applicationId, 5, {
                  province1: this.businessAdressDetailsForm.get('provinceOfficeAddress1').value,
                  address1: this.businessAdressDetailsForm.get('provinceDetails1').value,
                  province2: this.businessAdressDetailsForm.get('provinceOfficeAddress2').value,
                  address2: this.businessAdressDetailsForm.get('provinceDetails2').value,
                  province3: this.businessAdressDetailsForm.get('provinceOfficeAddress3').value,
                  address3: this.businessAdressDetailsForm.get('provinceDetails3').value
                })
                .subscribe(
                  (response) => {
                    if (response.statusCode === 200) {
                      console.log(response);
                      this.section5Details = response.data;
                      localStorage.setItem('section5Details', JSON.stringify(this.section5Details));
                      this.patchbusinessDetailsOffice()
                      this.toastr.success(response.message, 'Sucess');
                      this.group4SectionValid = true;
                      this.moveGroupFiveSection();
                    }
                  },
                  (error) => {
                    this.toastr.error(error.error?.message, 'Error');
                    // Handle error here (e.g., show an error message)
                  }
                );
            }
          },
          (error) => {
            this.toastr.error(error.error?.message, 'Error');
            // Handle error here (e.g., show an error message)
          }
        );
    } else if (
      this.businessDetailsOfficeForm.invalid &&
      Object.keys(this.businessDetailsOfficeForm.controls).some(
        (key) => this.businessDetailsOfficeForm.get(key)?.touched || this.businessDetailsOfficeForm.get(key)?.dirty
      )
    ) {
      this.group4SectionEdit = true;
      this.group4SectionText = 'active edit-text';
      this.group4SectionValid = false;
    } else {
      Object.keys(this.businessDetailsOfficeForm.controls).forEach((controlName) => {
        const controlB = this.businessDetailsOfficeForm.get(controlName);
        controlB?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  qualProMembershipSubmit(): void {
    if (this.qualProMembershipForm.valid) {
      console.log(this.qualProMembershipForm.value);
      this.group5SectionValid = true;
      this.moveGroupSixSection();
    } else if (
      this.qualProMembershipForm.invalid &&
      Object.keys(this.qualProMembershipForm.controls).some(
        (key) => this.qualProMembershipForm.get(key)?.touched || this.qualProMembershipForm.get(key)?.dirty
      )
    ) {
      this.group5SectionEdit = true;
      this.group5SectionText = 'active edit-text';
      this.group5SectionValid = false;
    } else {
      Object.keys(this.qualProMembershipForm.controls).forEach((controlName) => {
        const controlB = this.qualProMembershipForm.get(controlName);
        controlB?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  disqualRelationshipSubmit(): void {
    if (this.disqualRelationshipForm.valid) {
      console.log(this.disqualRelationshipForm.value);
      this.group6SectionValid = true;
      this.moveGroupSevenSection();
    } else if (
      this.disqualRelationshipForm.invalid &&
      Object.keys(this.disqualRelationshipForm.controls).some(
        (key) => this.disqualRelationshipForm.get(key)?.touched || this.disqualRelationshipForm.get(key)?.dirty
      )
    ) {
      this.group6SectionEdit = true;
      this.group6SectionText = 'active edit-text';
      this.group6SectionValid = false;
    } else {
      Object.keys(this.disqualRelationshipForm.controls).forEach((controlName) => {
        const controlB = this.disqualRelationshipForm.get(controlName);
        controlB?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  appEmpHistorySubmit(): void {
    if (this.appEmpHistoryForm.valid) {
      console.log(this.appEmpHistoryForm.value);
      this.group7SectionValid = true;
      this.moveGroupEightSection();
    } else if (
      this.appEmpHistoryForm.invalid &&
      Object.keys(this.appEmpHistoryForm.controls).some(
        (key) => this.appEmpHistoryForm.get(key)?.touched || this.appEmpHistoryForm.get(key)?.dirty
      )
    ) {
      this.group7SectionEdit = true;
      this.group7SectionText = 'active edit-text';
      this.group7SectionValid = false;
    } else {
      Object.keys(this.appEmpHistoryForm.controls).forEach((controlName) => {
        const controlB = this.appEmpHistoryForm.get(controlName);
        controlB?.markAsTouched();
      });
      console.log('Form is not valid');
    }
  }

  taxBondBankSubmit(): void {
    if (this.taxBondBankForm.valid) {
      console.log(this.taxBondBankForm.value);
      this.group8SectionValid = true;
      this.group8SectionEdit = false;
    } else if (
      this.taxBondBankForm.invalid &&
      Object.keys(this.taxBondBankForm.controls).some(
        (key) => this.taxBondBankForm.get(key)?.touched || this.taxBondBankForm.get(key)?.dirty
      )
    ) {
      this.group8SectionEdit = true;
      this.group8SectionText = 'active edit-text';
      this.group8SectionValid = false;
    } else {
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
      html2canvas(data).then((canvas) => {
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

  initializeSections() {
    for (let i = 1; i <= 8; i++) {
      this[`group${i}Section`] = false;
      this[`group${i}SectionText`] = '';
      this[`group${i}SectionCircle`] = '';
      this[`group${i}SectionEdit`] = false;
      this[`group${i}SectionValid`] = false;
    }
  }

  setActiveSection(sectionNumber) {
    // Reset all groups to false and clear text and circle classes
    for (let i = 1; i <= 8; i++) {
      this[`group${i}Section`] = false;
      this[`group${i}SectionText`] = '';
      this[`group${i}SectionCircle`] = '';
    }

    // Activate the selected section
    this[`group${sectionNumber}Section`] = true;
    this[`group${sectionNumber}SectionText`] = 'active active-text';
    this[`group${sectionNumber}SectionCircle`] = 'active-circle';
  }

  // Methods for each section
  moveGroupOneSection() {
    this.setActiveSection(1);
  }
  moveGroupTwoSection() {
    console.log('move to section 2');
    this.setActiveSection(2);
    this.cdr.detectChanges();
  }
  moveGroupThreeSection() {
    this.setActiveSection(3);
  }
  moveGroupFourSection() {
    this.setActiveSection(4);
  }
  moveGroupFiveSection() {
    this.setActiveSection(5);
  }
  moveGroupSixSection() {
    this.setActiveSection(6);
  }
  moveGroupSevenSection() {
    this.setActiveSection(7);
  }
  moveGroupEightSection() {
    this.setActiveSection(8);
  }

  // Back methods can call the same function
  movebackGroupTwoSection() {
    this.setActiveSection(2);
  }
  movebackGroupThreeSection() {
    this.setActiveSection(3);
  }
  movebackGroupFourSection() {
    this.setActiveSection(4);
  }
  movebackGroupFiveSection() {
    this.setActiveSection(5);
  }
  movebackGroupSixSection() {
    this.setActiveSection(6);
  }
  movebackGroupSevenSection() {
    this.setActiveSection(7);
  }
  movebackGroupEightSection() {
    this.setActiveSection(8);
  }

  // Class property to hold the section 1 details

  createApplication(userId: number) {
    this.liquidatorApplicationService
      .createApplication(userId)
      .pipe(
        switchMap((response) => {
          if (response?.statusCode === 201) {
            console.log(response);
            this.applicationId = response.applicationId;
            localStorage.setItem('applicationId', JSON.stringify(this.applicationId));
            this.toastr.success(response.message, 'Success');

            return this.liquidatorApplicationService.updateSection(response.applicationId, 1, {
              full_name: this.personalInfoForm.get('fullName').value,
              identity_number: this.personalInfoForm.get('identityNumber').value,
              race: this.personalInfoForm.get('race').value,
              gender: this.personalInfoForm.get('gender').value
            });
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (updateResponse: any) => {
          if (updateResponse?.statusCode === 200) {
            this.section1Details = updateResponse.data;

            // Save to local storage for persistence
            localStorage.setItem('section1Details', JSON.stringify(this.section1Details));

            // Patch the form with section1Details data
            this.patchPersonalInfoForm();

            this.toastr.success(updateResponse.message, 'Success');
            this.moveGroupTwoSection();
          }
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.error?.statusCode !== 400) {
            this.toastr.error(error.error?.message);
          }
        }
      });
  }

  // Helper function to patch the form
  patchPersonalInfoForm() {
    if (this.section1Details) {
      this.personalInfoForm.patchValue({
        fullName: this.section1Details.full_name,
        identityNumber: this.section1Details.identity_number,
        race: this.section1Details.race,
        gender: this.section1Details.gender
      });
    }
  }

  patchVerificationBusiness() {
    if (this.section2Details) {
      this.businessForm.patchValue({
        businessType: this.section2Details.business_type,
        businessStatus: this.section2Details.business_status
      });
    }
  }

  patchempBusTrading() {
    if (this.section3Details) {
      this.empBusTradingForm.patchValue({
        employerName: this.section3Details.employer_name,
        businessTelephone: this.section3Details.business_telephone,
        businessAddress: this.section3Details.business_address,
        firmName: this.section3Details.firm_name,
        partnersOrDirectors: this.section3Details.partners_or_directors,
        businessName: this.section3Details.business_name,
        businessDetails: this.section3Details.trading_partners,
        tradingPartners: this.section3Details.employer_name
      });
    }
  }

  patchbusinessDetailsOffice() {
    if (this.section4Details) {
      this.businessDetailsOfficeForm.patchValue({
        proofOfRental: this.section4Details.proof_of_rental,
        staffDetails: this.section4Details.staff_details,
        numComputers: this.section4Details.num_computers,
        numPrinters: this.section4Details.num_printers,
        additionalInfo: this.section4Details.additional_info,
      });
    }

    if (this.section5Details) {
      this.businessAdressDetailsForm.patchValue({
        provinceOfficeAddress1: this.section5Details.province1,
        provinceDetails1: this.section5Details.address1,
        provinceOfficeAddress2: this.section5Details.province2,
        provinceDetails2: this.section5Details.address2,
        provinceOfficeAddress3: this.section5Details.province3,
        provinceDetails3: this.section5Details.address3,
      });
    }
  }

  getApplication(applicationId: number) {
    this.liquidatorApplicationService.getApplication(applicationId).subscribe({
      next: (response) => console.log('Application details:', response),
      error: (error) => console.error('Error fetching application:', error)
    });
  }

  updateSection(applicationId: number, section: number, data: any) {
    this.liquidatorApplicationService.updateSection(applicationId, section, data).subscribe({
      next: (response) => console.log(`Section ${section} updated:`, response),
      error: (error) => console.error(`Error updating section ${section}:`, error)
    });
  }

  submitApplication(applicationId: number) {
    this.liquidatorApplicationService.submitApplication(applicationId).subscribe({
      next: (response) => console.log('Application submitted:', response),
      error: (error) => console.error('Error submitting application:', error)
    });
  }

  getReviewStatus(applicationId: number) {
    this.liquidatorApplicationService.getReviewStatus(applicationId).subscribe({
      next: (response) => console.log('Review status:', response),
      error: (error) => console.error('Error fetching review status:', error)
    });
  }
}
