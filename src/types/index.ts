// src/types/index.ts

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  birthday?: string;
  authToken: string;
  avatar?: string;
}

export interface Workout {
  id: string;
  title: string;
  description?: string;
  duration: number; // в хвилинах
  exercises: Exercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: WorkoutCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  sets?: number;
  reps?: number;
  duration?: number; // в секундах
  weight?: number; // в кг
  restTime?: number; // в секундах
  imageUrl?: string;
  videoUrl?: string;
  muscleGroups: string[];
  equipment?: string[];
}

export interface NutritionPlan {
  id: string;
  title: string;
  description?: string;
  dailyCalories: number;
  meals: Meal[];
  duration: number; // в днях
  createdAt: Date;
  updatedAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  dishes: Dish[];
  totalCalories: number;
  totalProteins: number;
  totalCarbs: number;
  totalFats: number;
  scheduledTime?: string; // HH:mm format
}

export interface Dish {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[];
  instructions?: string[];
  preparationTime?: number; // в хвилинах
  cookingTime?: number; // в хвилинах
  servings: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  imageUrl?: string;
  category: DishCategory;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface Progress {
  id: string;
  userId: number;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: BodyMeasurements;
  photos?: string[];
  notes?: string;
}

export interface BodyMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  legs?: number;
  neck?: number;
}

export interface Goal {
  id: string;
  userId: number;
  type: GoalType;
  target: number;
  current: number;
  deadline: Date;
  isCompleted: boolean;
  description?: string;
}

// Enums
export type WorkoutCategory = 
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'sports'
  | 'rehabilitation'
  | 'mixed';

export type MealType = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack';

export type DishCategory =
  | 'salads'
  | 'meat'
  | 'fish'
  | 'vegetarian'
  | 'soups'
  | 'desserts'
  | 'drinks'
  | 'snacks';

export type GoalType =
  | 'weight_loss'
  | 'weight_gain'
  | 'muscle_gain'
  | 'strength_gain'
  | 'endurance'
  | 'flexibility';

// Navigation types
export type TabName = 'dashboard' | 'training' | 'nutrition' | 'dishes';

export interface TabItem {
  id: TabName;
  title: string;
  icon: string;
  activeIcon: string;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Component Props types
export interface BaseComponentProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
}

// App State types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WorkoutState {
  workouts: Workout[];
  activeWorkout: Workout | null;
  isLoading: boolean;
  error: string | null;
}

export interface NutritionState {
  nutritionPlans: NutritionPlan[];
  activePlan: NutritionPlan | null;
  todayMeals: Meal[];
  isLoading: boolean;
  error: string | null;
}
