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
 {id:4,title:'Import & Export of Goods',short:'Import & Export',icon:Ship,description:'Import and export of goods.'},
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
 {id:7,title:'Petrol Filling Stations & Service Stations',short:'Petroleum',icon:Fuel,description:'Petrol filling stations and service stations.'},
 {id:8,title:'Food Processing & Manufacturing',short:'Food Processing',icon:CookingPot,description:'Food processing and manufacturing.'},
 {id:9,title:'Soft Drinks & Pure Water Production',short:'Beverages',icon:CupSoda,description:'Soft drinks and pure water production.'},
 {id:10,title:'CCTV Installation & Security Services',short:'Security',icon:ShieldCheck,description:'CCTV installation and security services.'},
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
 {id:13,title:'Estate Management & Property Development',short:'Property',icon:Building2,description:'Estate management and property development.'},
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
