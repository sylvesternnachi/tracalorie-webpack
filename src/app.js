import '@fortawesome/fontawesome-free/js/all';
import Storage from "./Storage.js";

import { Modal, Collapse} from 'bootstrap';
import CalorieTracker from './Tracker.js';
import {Meal, Workout} from './Item.js';

import './css/bootstrap.css';
import './css/style.css'





class App{
    constructor(){
        this._tracker = new CalorieTracker();
        document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this));

        //Removing Item from the calories
        document.getElementById('meal-items').addEventListener('click', this._removeMealItems.bind(this));
        document.getElementById('workout-items').addEventListener('click', this._removeWorkItems.bind(this));
        document.getElementById('filter-meals').addEventListener('keyup', this._filterMealItems.bind(this));
        document.getElementById('filter-workouts').addEventListener('keyup', this._filterWorkoutItems.bind(this));
        document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));

        //Reset All

        document.getElementById('reset').addEventListener('click', this._reset.bind(this));
        document.getElementById('limit').value = Storage.getCaloriesLimit();

        this._tracker.loadItem()

    }

    _newMeal(e){
        e.preventDefault();

        const name = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        //Validation input

        if(name.value == '' || calories.value == ''){
            alert('Please fill it all fields');
            return;
        }

        const meal = new Meal(name.value, Number(calories.value));
        this._tracker.addMeal(meal);

        name.value = '';
        calories.value = '';

        const collapseMeal = document.getElementById('collapse-meal');
        const bsCollapse = new Collapse(collapseMeal,{
            toggle: true
        })

        
    }



       _newWorkout(e){
        e.preventDefault();

        const name = document.getElementById('workout-name');
        const calories = document.getElementById('workout-calories');

        //Validation input

        if(name.value == '' || calories.value == ''){
            alert('Please fill it all fields');
            return;
        }

        const workout = new Workout(name.value, Number(calories.value));
        this._tracker.addWorkout(workout);

        name.value = '';
        calories.value = '';

          const collapseWorkout = document.getElementById('collapse-workout');
        const bsCollapse = new Collapse(collapseWorkout,{
            toggle: true
        })
        
    }

    _removeMealItems(e){

        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-mark')){
            if(confirm('Are you sure')){
                const id = e.target.closest('.card').getAttribute('data-id');
                e.target.closest('.card').remove();
                this._tracker.removeMeal(id);
                 
            }
        }
       
    }

    _removeWorkItems(e){
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-mark')){
            if(confirm('Are you sure')){
                const id = e.target.closest('.card').getAttribute('data-id');
                e.target.closest('.card').remove();
                this._tracker.removeWorkout(id);
                 
            }
        }
    }

    _filterMealItems(e){
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#meal-items .card`).forEach(item => {
            const name = item.firstElementChild.firstElementChild.textContent;
           
            if(name.toLowerCase().indexOf(text) !== -1){
                item.style.display = 'block';
            }else{
                 item.style.display = 'none';
            }
        });
    }

    _filterWorkoutItems(e){
        const text = e.target.value.toLowerCase();
       
        document.querySelectorAll(`#workout-items .card`).forEach(item => {
            const name = item.firstElementChild.firstElementChild.textContent;


            if(name.toLocaleLowerCase().indexOf(text) !== -1){
                item.style.display = 'block';
            }else{
                item.style.display = 'none';
            }

        });
    }

    _reset(){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
         document.getElementById('workout-items').innerHTML = '';
           document.getElementById('filter-meals').value = '';
           document.getElementById('filter-workouts').value = '';

    }

    _setLimit(e){
        e.preventDefault();
        const limitVal = document.querySelector('#limit');

        if(limitVal.value == ''){
            alert('Please add a limit');
            return
        }

        this._tracker.setLimit(Number(limitVal.value));
        limitVal.value = '';

        // close the modal
        const modalEl = document.getElementById('limit-modal');
        const modal = Modal.getInstance(modalEl); 
        modal.hide();
    }


}



const app = new App();