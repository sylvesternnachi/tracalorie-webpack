import Storage from "./Storage.js";
class CalorieTracker {
    constructor(){
        this._calorieLimit = Storage.getCaloriesLimit();
        this._totalCalories = Storage.getTotalCalories(0);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkout();

        this.#displayCaloriesLimit();
        this.#displayCaloriesTotal();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining();
        this.#displayCaloriesProgress();
        
    }

    // Public Methods //

    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveMeals(meal);
        this._displayNewMeal(meal);
        this.#render();
    }

     addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories
         Storage.updateTotalCalories(this._totalCalories)
         Storage.saveWorkouts(workout);
        this._displayNewWorkout(workout);
        this.#render();
    }

    removeMeal(id){
        const removeMeal = this._meals.find(item => item.id == id);
        if(removeMeal){
            this._totalCalories -= removeMeal.calories;
             Storage.updateTotalCalories(this._totalCalories)
        }
        this._meals = this._meals.filter(item => item.id != id);
        Storage.removeMeal(id)
        this.#render();
    }

       removeWorkout(id){
        const removeWork = this._workouts.find(item => item.id == id);
        if(removeWork){
            this._totalCalories += removeWork.calories;
             Storage.updateTotalCalories(this._totalCalories)
        }
        this._workouts = this._workouts.filter(item => item.id != id);
         Storage.removeWorkout(id)
        this.#render();
    }

    reset(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this.#render();
    }

    setLimit(value){
        this._calorieLimit = value;
        Storage.setCalorieLimit(value)
        this.#displayCaloriesLimit();
        this.#render();
    }

    loadItem(){
        this._meals.forEach(meal => this._displayNewMeal(meal))
        this._workouts.forEach(workout => this._displayNewWorkout(workout))
    }


    // Private Method / 

    #displayCaloriesTotal(){
        const totalCaloriesElement = document.getElementById('calories-total');
        totalCaloriesElement.innerHTML = this._totalCalories;
    }

     #displayCaloriesLimit(){
        const CalorieLimitElement = document.getElementById('calories-limit');
        CalorieLimitElement.innerHTML = this._calorieLimit;
    }

    #displayCaloriesConsumed(){
        const caloriesConsumedElement = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

        caloriesConsumedElement.innerHTML = consumed; 
    }

     #displayCaloriesBurned(){
        const caloriesBurnedElement = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);

        caloriesBurnedElement.innerHTML = burned;
    }

      #displayCaloriesRemaining(){
        

        const caloriesRemainingElement = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;

        caloriesRemainingElement.innerHTML = remaining;

        const progressElement = document.getElementById('calorie-progress');

        if(remaining <= 0) {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-danger');
            progressElement.classList.remove('bg-success');
             progressElement.classList.add('bg-danger');

        }else{
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-light');
             progressElement.classList.remove('bg-danger');
             progressElement.classList.add('bg-success');
        }
    }

    #displayCaloriesProgress(){
        const progressElement = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;

        const width = Math.min(percentage, 100);

        progressElement.style.width = `${width}%`;
    }

    _displayNewMeal(meal){
        const mealsElement = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);

        mealEl.innerHTML = ` 
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `;

        mealsElement.appendChild(mealEl);

    }

    _displayNewWorkout(workout){
        const workoutElements = document.getElementById('workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);

        workoutEl.innerHTML = ` 

         <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                   ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        
        `;

        workoutElements.appendChild(workoutEl);
    }


    #render(){
        this.#displayCaloriesTotal();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining();
        this.#displayCaloriesProgress();
        
    }

}

export default CalorieTracker;