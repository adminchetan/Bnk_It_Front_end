import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

type State = 'Uttarakhand' | 'Himachal';
interface City {
  id: number;
  name: string;
}
interface Cities {
  [key: string]: City[];
}

@Component({
  selector: 'app-products-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatSelectModule],
  templateUrl: './products-component.component.html',
  styleUrls: ['./products-component.component.css']
})
export class ProductsComponentComponent implements OnInit {
  CompleteFormValidation = false;
  productForm: FormGroup;

  products = [
    { id: 1, name: 'Need static website' },
    { id: 2, name: 'Need dynamic web application' },
    { id: 3, name: 'Need android application' },
    { id: 4, name: 'I want to modify my web application' },
    { id: 5, name: 'Domain Registration' },
    { id: 6, name: 'Web space required' },
    { id: 7, name: 'Networking Devices' },
    { id: 8, name: 'Internet Connection Required' }
  ];

  states = [
    { id: 1, name: 'Uttarakhand' },
    { id: 2, name: 'Himachal' }
  ];

  cities: Cities = {
    'Uttarakhand': [
      { id: 1, name: 'Dehradun' },
      { id: 2, name: 'Nainital' },
      { id: 3, name: 'Haridwar' },
      { id: 4, name: 'Almora' },
      { id: 5, name: 'Bageshwar' },
      { id: 6, name: 'Chamoli' },
      { id: 7, name: 'Pithoragarh' },
      { id: 8, name: 'Rudraprayag' },
      { id: 9, name: 'Tehri Garhwal' },
      { id: 10, name: 'Udham Singh Nagar' },
      { id: 11, name: 'Uttarkashi' }
    ],
    'Himachal': [
      { id: 1, name: 'Shimla' },
      { id: 2, name: 'Manali' },
      { id: 3, name: 'Dharamshala' },
      { id: 4, name: 'Solan' },
      { id: 5, name: 'Kullu' },
      { id: 6, name: 'Mandi' },
      { id: 7, name: 'Kangra' },
      { id: 8, name: 'Hamirpur' },
      { id: 9, name: 'Chamba' },
      { id: 10, name: 'Bilaspur' },
      { id: 11, name: 'Una' },
      { id: 12, name: 'Kinnaur' },
      { id: 13, name: 'Lahaul and Spiti' }
    ]
  };

  cityfield = false;
  filteredProducts: Observable<{ id: number, name: string }[]> | undefined;
  filteredStates: Observable<{ id: number, name: string }[]> | undefined;
  filteredCities: Observable<City[]> | undefined;

  constructor(private fb: FormBuilder) {
    // this will build the form and validate if anything is not filled
    this.productForm = this.fb.group({
      state: ['', Validators.required],
      product: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      city: [{ value: '', disabled: true }, Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    // initialize option in Products field from the array
    this.filteredProducts = this.productForm.get('product')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProducts(value))
    );

    // initialize option in State field from the array
    this.filteredStates = this.productForm.get('state')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStates(value))
    );

    // Enable or disable city field based on state field value
    this.productForm.get('state')!.valueChanges.subscribe(value => {
      const cityControl = this.productForm.get('city');
      if (value) {
        cityControl!.enable();
      } else {
        cityControl!.disable();
      }
    });

    // initialize option in City field from the array
    this.filteredCities = this.productForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
  }

  getFormControl(controlName: string): FormControl {
    return this.productForm.get(controlName) as FormControl;
  }

  // Get the Product values from the Array
  private _filterProducts(value: string): { id: number, name: string }[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  // Get the State values from the Array
  private _filterStates(value: string): { id: number, name: string }[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  // Get the Cities values from the Array once state is selected
  private _filterCities(value: string): City[] {
    const state = this.getFormControl('state').value as State;
    const cities = this.cities[state] || [];
    const filterValue = value.toLowerCase();
    return cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  validateState(control: FormControl) {
    return this.states.some(state => state.name === control.value) ? null : { invalidState: true };
  }

  validateCity(control: FormControl) {
    const state = this.getFormControl('state').value as State;
    return this.cities[state]?.some(city => city.name === control.value) ? null : { invalidCity: true };
  }

  onSubmit() {
    // get all the values submitted by user
    const city = this.productForm.get('city')?.value;
    const state = this.productForm.get('state')?.value;
    const product = this.productForm.get('product')?.value;
    const email = this.productForm.get('email')?.value;
    const mobile = this.productForm.get('mobile')?.value;
    const description = this.productForm.get('description')?.value;

    if (this.ValidateUserInputs(city, state, product, email, mobile, description)) 
    {
      if (!this.isProductPresentinArray(product)) 
      {
      } 
      else if (!this.isStatePresentinArray(state)) 
      {
        this.CompleteFormValidation = false;
      } 
      else if (!this.isCityPresentinArray(city, state)) 
      {
        this.CompleteFormValidation = false;
        
      }

      else{
        this.swalfire('success','','');
        console.log(this.productForm.value);
        const cityId = this.cities[state]?.find(c => c.name == city)?.id;
        const stateId = this.states.find(s => s.name == state)?.id;
         const productId = this.products.find(p => p.name == product)?.id;
        console.log('City ID:', cityId);
        console.log('State ID:', stateId);
        console.log('Product ID:', productId);
      }
    } 
    else 
    {

    }
  }

  ValidateUserInputs(city: string, state: string, product: string, email: string, mobile: string, description: string): boolean {
    if (!email || !this.validateEmail(email)) {
      this.showAlert('error', 'Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (!mobile || !this.validateMobile(mobile)) {
      this.showAlert('error', 'Invalid Mobile', 'Please enter a valid mobile number.');
      return false;
    }

    if (!city || city.trim() == '') {
      this.showAlert('error', 'Invalid City', 'Please enter a valid city.');
      return false;
    }

    if (!state || state.trim() == '') {
      this.showAlert('error', 'Invalid State', 'Please enter a valid state.');
      return false;
    }

    if (!product || product.trim() == '') {
      this.showAlert('error', 'Invalid Product', 'Please enter a valid product.');
      return false;
    }

    if (!description || description.trim() == '') {
      this.showAlert('error', 'Invalid Description', 'Please enter a valid description.');
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  validateMobile(mobile: string): boolean {
    const re = /^\d{10}$/;
    return re.test(mobile);
  }

  isProductPresentinArray(product: string): boolean {
    if (this.products.some(p => p.name === product)) {
      return true;
    }
    this.swalfire('warning', "Product", product);
    return false;
  }

  isStatePresentinArray(state: string): boolean {
    if (this.states.some(s => s.name === state)) {
      return true;
    }
    this.swalfire('warning', "State", state);
    return false;
  }

  isCityPresentinArray(city: string, state: string): boolean {
    if (this.cities[state]?.some(c => c.name === city)) {
      return true;
    }
    this.swalfire('warning', "City", city);
    return false;
  }

  // ----------------------------------------------------------SWAL for Arya list values check-----------------------------------------------------------//
  swalfire(type: string, attribute: string, context: string): boolean {
    if (type == 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your form has been submitted successfully!',
        confirmButtonText: 'OK'
      });
      return true;
    } else if (type == 'warning') {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Apologies! Currently we are not serving for selected  ' + attribute + ' (' + context + ') Can you please select any other ' + attribute + '?',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (type == 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error submitting the form. Please try again.',
        confirmButtonText: 'OK'
      });
      return false;
    } else {
      return false;
    }
  }

  showAlert(icon: 'success' | 'error' | 'warning' | 'info', title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonText: 'OK'
    });
  }
}
