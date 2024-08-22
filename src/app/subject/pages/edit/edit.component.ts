import { Component, Inject } from '@angular/core';
import { Subject } from '../../interfaces/subject.interface';
import { Category } from 'src/app/category/interfaces/category.interface';
import { Profile } from 'src/app/profile/interfaces/profile.interface';
import { Specialization } from 'src/app/specialization/interfaces/specialization.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { SpecializationService } from 'src/app/specialization/services/specialization.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  subject!: Subject;
  categories: Category[] = [];
  profiles: Profile[] = [];
  specializations: Specialization[] = [];
  selectedFile: File | null = null;
  previewImg: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private categoryService: CategoryService,
    private profileService: ProfileService,
    private specializationService: SpecializationService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.profileService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
    this.specializationService.getSpecializations().subscribe((specializations) => {
      this.specializations = specializations;
    });
    this.subjectService.getSubject( this.data.id ).subscribe( ( subject ) => {
      this.subject = subject;
      console.log(subject)
      this.formEdit.patchValue({
        specialization_id: subject.specialization_id,
        title: subject.title,
        description: subject.description,
      })
    } ) 
  }

  formEdit: FormGroup = this.fb.group({
    category_id: ['', Validators.required],
    profile_id: ['', Validators.required],
    specialization_id: ['', Validators.required],
    title: ['', Validators.required], 
    description: ['', Validators.required],
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof event.target?.result === 'string') {
          this.previewImg = event.target.result;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addPhoto() {
    const formData = new FormData();
    formData.append('subject_id', this.subject.id!.toString());
    if (this.selectedFile ) {
      formData.append('urlPhoto', this.selectedFile);
    }
    this.subjectService.postSubjectPhoto(formData).subscribe(
      (response) => {
        console.log(response);
        this.sharedService.notificarImageAdded();
      },
    );
  }

  deletePhoto( id: number ) {
    this.subjectService.deleteSubjectPhoto(id).subscribe(() => {
      this.subject.photo = undefined;
      this.selectedFile = null;
      this.previewImg = null;
    })
  }

  onEdit() {
    if( this.formEdit.untouched ) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true
      });
      return;
    }
    const subject = this.formEdit.value;
    this.subjectService.putSubject( this.data.id, subject ).subscribe( ( subject ) => {
      this.addPhoto();
      this.sharedService.notificarElementCreated();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        showConfirmButton: false,
        timer: 1000,
      });
    } )
  }
}
