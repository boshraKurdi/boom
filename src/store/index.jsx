import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './Auth/AuthSlice';
import compaigns from './Dashboard/Compaigns/CompaignsSlice';
import rewards from './Dashboard/Rewards/RewardsSlice';
import locations from './Dashboard/Locaions/LocationsSlice';
import steps from './Dashboard/Steps/StepsSlice';
import teampositions from './Dashboard/Teampositions/TeampositionsSlice';
import teams from './Dashboard/Teams/TeamsSlice';
import reports from './Dashboard/Reports/ReportsSlice';
import learns from './Dashboard/Learns/LearnsSlice';
import compaigns_app from './Compaigns/CompaignsSlice';
import locations_app from './Locaions/LocationsSlice';
import learns_app from './Learns/LearnsSlice';
import teams_app from './Teams/TeamsSlice';
import reports_app from './Reports/ReportsSlice';
import users_app from './Users/UsersSlice';
import organizations from './Dashboard/Organizations/OrganizationsSlice';
import tools from './Dashboard/Tools/ToolsSlice';
import tools_app from './Tools/ToolsSlice';
import objectives from './Dashboard/Objectves/ObjectvesSlice';
import units from './Dashboard/Units/UnitsSlice';
import appointments from './Dashboard/Appointments/AppointmentsSlice';
import donations from './Dashboard/Donations/DonationsSlice';
import donations_app from './Donations/DonationsSlice';
import users from './Dashboard/Users/UsersSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  whiteList: ['auth']
}
const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whiteList: ['user' , 'token']
}
const rootReducer = combineReducers({
  auth : persistReducer(authPersistConfig , auth),
  compaigns,
  rewards ,
  locations ,
  steps ,
  teampositions ,
  teams , 
  reports ,
  learns ,
  compaigns_app ,
  locations_app ,
  learns_app , 
  teams_app ,
  donations_app,
  users_app ,
  organizations ,
  tools ,
  objectives ,
  units ,
  tools_app,
  appointments ,
  donations ,
  users ,
  reports_app
})
 const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
let persistor = persistStore(store)
export { store , persistor }