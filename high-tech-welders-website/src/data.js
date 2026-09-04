import {Anvil, Factory, ShoppingCart, Ship, Sprout, Sun, Fuel, CookingPot, CupSoda, ShieldCheck, Printer, Scissors, Building2, Bus, HardHat, Zap, Wheat, Warehouse, Home, Truck} from 'lucide-react';
import transport1 from './assets/services/transportation/transport-1.png';
import transport2 from './assets/services/transportation/transport-2.jpeg';
import transport3 from './assets/services/transportation/transport-3.jpeg';
import transport4 from './assets/services/transportation/transport-4.jpeg';
import transport5 from './assets/services/transportation/transport-5.jpeg';
import transport6 from './assets/services/transportation/transport-6.jpeg';
import fashion1 from './assets/services/fashion/fashion-1.jpeg';
import fashion2 from './assets/services/fashion/fashion-2.jpeg';
import fashion3 from './assets/services/fashion/fashion-3.jpeg';
import fashion4 from './assets/services/fashion/fashion-4.jpeg';
import fashion5 from './assets/services/fashion/fashion-5.jpeg';
import fashion6 from './assets/services/fashion/fashion-6.jpeg';
import fashion7 from './assets/services/fashion/fashion-7.jpeg';
import fashion8 from './assets/services/fashion/fashion-8.jpeg';
import fashion9 from './assets/services/fashion/fashion-9.jpeg';
import manufacturing1 from './assets/services/manufacturing/manufacturing-1.jpeg';
import manufacturing2 from './assets/services/manufacturing/manufacturing-2.jpeg';
import manufacturing3 from './assets/services/manufacturing/manufacturing-3.jpeg';
import manufacturing4 from './assets/services/manufacturing/manufacturing-4.jpeg';
import manufacturing5 from './assets/services/manufacturing/manufacturing-5.jpeg';
import manufacturing6 from './assets/services/manufacturing/manufacturing-6.jpeg';
import manufacturing7 from './assets/services/manufacturing/manufacturing-7.jpeg';
import manufacturing8 from './assets/services/manufacturing/manufacturing-8.jpeg';
import farming1 from './assets/services/farming/farming-1.jpeg';
import farming2 from './assets/services/farming/farming-2.jpg';
import farming3 from './assets/services/farming/farming-3.jpg';
import farming4 from './assets/services/farming/farming-4.jpg';
import farming5 from './assets/services/farming/farming-5.jpg';
import farming6 from './assets/services/farming/farming-6.jpg';
import printing1 from './assets/services/printing/printing-1.jpeg';
import printing2 from './assets/services/printing/printing-2.jpeg';
import printing3 from './assets/services/printing/printing-3.jpeg';
import welding1 from './assets/services/welding/welding-1.jpg';
import welding2 from './assets/services/welding/welding-2.jpeg';
import welding3 from './assets/services/welding/welding-3.jpg';
import welding4 from './assets/services/welding/welding-4.jpg';
import trading1 from './assets/services/trading/trading-1.jpg';
import trading2 from './assets/services/trading/trading-2.jpg';
import solar1 from './assets/services/solar/solar-1.jpg';
import solar2 from './assets/services/solar/solar-2.jpg';
import solar3 from './assets/services/solar/solar-3.jpg';
import solar4 from './assets/services/solar/solar-4.jpg';
import solar5 from './assets/services/solar/solar-5.jpg';
import beverages1 from './assets/services/beverages/beverages-1.jpg';
import beverages2 from './assets/services/beverages/beverages-2.jpg';
import beverages3 from './assets/services/beverages/beverages-3.jpg';
import importExport1 from './assets/services/import-export/import-export-1.jpg';
import importExport2 from './assets/services/import-export/import-export-2.jpg';
import estate1 from './assets/services/estate/estate-1.jpg';
import estate2 from './assets/services/estate/estate-2.jpg';
import estate3 from './assets/services/estate/estate-3.jpg';
import estate4 from './assets/services/estate/estate-4.jpg';
import estate5 from './assets/services/estate/estate-5.jpg';
import petrolStation1 from './assets/services/petrol-stations/petrol-station-1.jpg';
import petrolStation2 from './assets/services/petrol-stations/petrol-station-2.jpg';
import petrolStation3 from './assets/services/petrol-stations/petrol-station-3.jpg';
import petrolStation4 from './assets/services/petrol-stations/petrol-station-4.jpg';
import cctv1 from './assets/services/cctv/cctv-1.jpg';
import cctv2 from './assets/services/cctv/cctv-2.jpg';
import cctv3 from './assets/services/cctv/cctv-3.jpg';
import cctv4 from './assets/services/cctv/cctv-4.jpg';
import cctv5 from './assets/services/cctv/cctv-5.jpg';
import foodProcessing1 from './assets/services/food-processing/food-processing-1.jpg';
import foodProcessing2 from './assets/services/food-processing/food-processing-2.jpg';
import foodProcessing3 from './assets/services/food-processing/food-processing-3.jpg';
import foodProcessing4 from './assets/services/food-processing/food-processing-4.jpg';
import foodProcessing5 from './assets/services/food-processing/food-processing-5.jpg';
import foodProcessing6 from './assets/services/food-processing/food-processing-6.jpg';

export const services=[
 {id:1,title:'Welding Services & Contracting',short:'Welding',icon:Anvil,description:'Welding services and contracting.',images:[
  {src:welding1,alt:'Steel reinforcement work at an active construction site'},
  {src:welding2,alt:'Fabricated steel frames prepared for welding and contracting work'},
  {src:welding3,alt:'Welder joining steel components with protective equipment'},
  {src:welding4,alt:'Metal fabricator welding a steel component in a workshop'}
 ]},
 {id:2,title:'Manufacturing & Supply of Equipment and Materials',short:'Manufacturing',icon:Factory,description:'Manufacturing and supply of equipment and materials.',images:[
  {src:manufacturing1,alt:'Manufacturing facility with material processing equipment'},
  {src:manufacturing2,alt:'Workers installing industrial equipment and materials'},
  {src:manufacturing3,alt:'Workers servicing industrial pipeline equipment'},
  {src:manufacturing4,alt:'Industrial pipeline equipment installation'},
  {src:manufacturing5,alt:'Structural welding and equipment fabrication work'},
  {src:manufacturing6,alt:'Steel coil manufacturing equipment'},
  {src:manufacturing7,alt:'Sheet metal manufacturing equipment'},
  {src:manufacturing8,alt:'Wide manufacturing facility with processing equipment'}
 ]},
 {id:3,title:'General Trading & Merchandising',short:'Trading',icon:ShoppingCart,description:'General trading and merchandising.',images:[
  {src:trading1,alt:'Retail clothing and accessories display in a merchandising store'},
  {src:trading2,alt:'Branded apparel merchandising display in a retail store'}
 ]},
 {id:4,title:'Import & Export of Goods',short:'Import & Export',icon:Ship,description:'Import and export of goods.',images:[
  {src:importExport1,alt:'Freight container truck positioned for cargo transport'},
  {src:importExport2,alt:'Import and export shipping containers suspended at a cargo terminal'}
 ]},
 {id:5,title:'Farming & Livestock Breeding',short:'Agriculture',icon:Sprout,description:'Farming and livestock breeding.',images:[
  {src:farming1,alt:'Fish farming ponds with aquaculture facilities'},
  {src:farming2,alt:'Farmer harvesting leafy crops in a cultivated field'},
  {src:farming3,alt:'Mixed poultry flock on a farm'},
  {src:farming4,alt:'Cattle gathered at a livestock market'},
  {src:farming5,alt:'Poultry egg production in a laying facility'},
  {src:farming6,alt:'Chickens inside a poultry house'}
 ]},
 {id:6,title:'Solar Energy Solutions & Automation Services',short:'Solar',icon:Sun,description:'Solar energy solutions and automation services.',images:[
  {src:solar1,alt:'Smart home automation controls for lighting and security'},
  {src:solar2,alt:'Automated production line assembling solar panels'},
  {src:solar3,alt:'Solar panel and inverter equipment for energy systems'},
  {src:solar4,alt:'Solar panel array generating renewable energy'},
  {src:solar5,alt:'Solar panels, inverters, and energy storage equipment'}
 ]},
 {id:7,title:'Petrol Filling Stations & Service Stations',short:'Petroleum',icon:Fuel,description:'Petrol filling stations and service stations.',images:[
  {src:petrolStation1,alt:'Fuel pumps at a petrol filling station forecourt'},
  {src:petrolStation2,alt:'Fuel nozzle dispensing petrol into a vehicle'},
  {src:petrolStation3,alt:'Standalone fuel dispensing pump at a service station'},
  {src:petrolStation4,alt:'Modern petrol station with multiple fuel pumps'}
 ]},
 {id:8,title:'Food Processing & Manufacturing',short:'Food Processing',icon:CookingPot,description:'Food processing and manufacturing.',images:[
  {src:foodProcessing1,alt:'Workers monitoring an industrial food processing line'},
  {src:foodProcessing2,alt:'Grain storage silos beside cultivated farmland'},
  {src:foodProcessing3,alt:'Prepared food product moving along a factory conveyor'},
  {src:foodProcessing4,alt:'Automated potato sorting and packaging equipment'},
  {src:foodProcessing5,alt:'Workers preparing fresh vegetables for food packaging'},
  {src:foodProcessing6,alt:'Corn cobs moving through an agricultural processing conveyor'}
 ]},
 {id:9,title:'Soft Drinks & Pure Water Production',short:'Beverages',icon:CupSoda,description:'Soft drinks and pure water production.',images:[
  {src:beverages1,alt:'Bottling line for packaged drinking water production'},
  {src:beverages2,alt:'Workers operating a bottled water production facility'},
  {src:beverages3,alt:'Stainless steel water filtration and treatment equipment'}
 ]},
 {id:10,title:'CCTV Installation & Security Services',short:'Security',icon:ShieldCheck,description:'CCTV installation and security services.',images:[
  {src:cctv1,alt:'CCTV surveillance cameras and monitoring equipment kit'},
  {src:cctv2,alt:'Security cameras and recording equipment for surveillance systems'},
  {src:cctv3,alt:'Handheld multi-camera surveillance device'},
  {src:cctv4,alt:'Technician installing a CCTV security camera'},
  {src:cctv5,alt:'Mounted CCTV security cameras under a ceiling'}
 ]},
 {id:11,title:'General Printing',short:'Printing',icon:Printer,description:'General printing.',images:[
  {src:printing1,alt:'Company representative beside commercial printing equipment'},
  {src:printing2,alt:'Company office with printing and document production equipment'},
  {src:printing3,alt:'Company representative at a document printing workstation'}
 ]},
 {id:12,title:'Fashion & Design Industry Services',short:'Fashion',icon:Scissors,description:'Fashion and design industry services.',images:[
  {src:fashion1,alt:'Fashion and design industry services embroidered gold outfit'},
  {src:fashion2,alt:'Fashion and design industry services tailored garments'},
  {src:fashion3,alt:'Fashion and design industry services navy embroidered outfit'},
  {src:fashion4,alt:'Fashion and design industry services navy full-length outfit'},
  {src:fashion5,alt:'Fashion and design industry services gold full-length outfit'},
  {src:fashion6,alt:'Fashion and design industry services pink full-length outfit'},
  {src:fashion7,alt:'Fashion and design industry services floral embroidered outfit'},
  {src:fashion8,alt:'Fashion and design industry services grey embroidered outfit'},
  {src:fashion9,alt:'Fashion and design industry services cream embroidered outfit'}
 ]},
 {id:13,title:'Estate Management & Property Development',short:'Property',icon:Building2,description:'Estate management and property development.',images:[
  {src:estate1,alt:'Building development plans with a house under construction'},
  {src:estate2,alt:'Illustrated residential estate planning and property management layout'},
  {src:estate3,alt:'Modern multi-storey residential property development'},
  {src:estate4,alt:'Contemporary residential housing development along a street'},
  {src:estate5,alt:'Completed residential estate with detached homes'}
 ]},
 {id:14,title:'Transportation & Tourism',short:'Transport',icon:Bus,description:'Transportation and tourism.',images:[
  {src:transport1,alt:'Transportation and tourism services equipment'},
  {src:transport2,alt:'Transportation and tourism services equipment'},
  {src:transport3,alt:'Transportation and tourism services vehicle'},
  {src:transport4,alt:'Transportation and tourism services vehicle'},
  {src:transport5,alt:'Transportation and tourism services vehicle'},
  {src:transport6,alt:'Transportation and tourism services motorcycle'}
 ]}
];

export const industries=[
 {title:'Engineering & Construction',icon:HardHat,image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80'},
 {title:'Manufacturing',icon:Factory,image:'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=80'},
 {title:'Energy',icon:Zap,image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80'},
 {title:'Agriculture',icon:Wheat,image:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80'},
 {title:'Security',icon:ShieldCheck,image:'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80'},
 {title:'Real Estate',icon:Home,image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80'},
 {title:'Trading & Supply',icon:Warehouse,image:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80'},
 {title:'Transportation',icon:Truck,image:'https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&w=900&q=80'}
];
