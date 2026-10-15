// SI units throughout. Renderers consume these models; no independent display physics.
export const G=9.81;
export const radians=d=>d*Math.PI/180;
export function kinematics(time,{v0=0,a=0}={}) {return {x:v0*time+.5*a*time*time,v:v0+a*time,a};}
export function forceMotion({force,mass,mu=0},time=0) {
 const normal=mass*G,staticLimit=1.25*mu*normal;
 const sliding=Math.abs(force)>staticLimit;
 const friction=sliding?-Math.sign(force)*mu*normal:-force;
 const net=force+friction,a=net/mass;
 return {...kinematics(time,{a}),normal,friction,net,sliding};
}
export function incline({angle,mass,mu=0},time=0) {
 const theta=radians(angle),normal=mass*G*Math.cos(theta),down=mass*G*Math.sin(theta);
 const sliding=down>1.25*mu*normal+1e-10,friction=sliding?mu*normal:down,a=(down-friction)/mass;
 return {...kinematics(time,{a}),normal,down,friction,sliding};
}
export function falling({height,mass=1},time=0) {
 const duration=Math.sqrt(2*height/G),t=Math.min(Math.max(time,0),duration),y=Math.max(0,height-.5*G*t*t),v=G*t;
 return {t,duration,y,v,potential:mass*G*y,kinetic:.5*mass*v*v,total:mass*G*height};
}
export const pressure=({mass,area})=>mass*G/area;
export const hydrostatic=({density=1000,depth})=>density*G*depth;
export function buoyancy({density,volume=.002,fluid=1000}) {
 const fraction=Math.min(1,density/fluid),weight=density*volume*G,force=fluid*volume*fraction*G;
 return {fraction,weight,force,net:force-weight,floating:density<=fluid};
}
export function thermal({mass=1,temperature=80,conductance=100},time=0) {
 // Two insulated water reservoirs exchanging heat through a wall; c constant.
 const c1=mass*4180,c2=4180,equilibrium=(c1*temperature+c2*20)/(c1+c2),factor=Math.exp(-conductance*(1/c1+1/c2)*time);
 const hot=equilibrium+(temperature-equilibrium)*factor,cold=(c1*temperature+c2*20-c1*hot)/c2;
 return {hot,cold,equilibrium,energy:c1*hot+c2*cold,flow:conductance*(hot-cold)};
}
export function wave({frequency=1,amplitude=.2,speed=2},x,time=0) {const wavelength=speed/frequency;return {y:amplitude*Math.sin(2*Math.PI*(frequency*time-x/wavelength)),wavelength,period:1/frequency,speed};}
export function reflection({incoming=30,tilt=0}) {
 const d={x:Math.sin(radians(incoming)),y:Math.cos(radians(incoming))},n={x:Math.sin(radians(tilt)),y:-Math.cos(radians(tilt))},dot=d.x*n.x+d.y*n.y;
 const reflected={x:d.x-2*dot*n.x,y:d.y-2*dot*n.y},angle=Math.acos(Math.min(1,Math.abs(dot)))*180/Math.PI;
 return {d,n,reflected,incidence:angle,reflection:angle};
}
export function refraction({angle,n1=1,n2=1.5}) {const sin=n1*Math.sin(radians(angle))/n2;return {tir:Math.abs(sin)>1,angle:Math.abs(sin)>1?null:Math.asin(sin)*180/Math.PI};}
export function lens({focal=.3,object=.8}) {const denominator=1/focal-1/object;if(Math.abs(denominator)<1e-10)return {infinite:true,image:null,magnification:null};const image=1/denominator;return {infinite:false,image,magnification:-image/object,real:image>0};}
export function dipole({x=1,y=.5,moment=2}) {
 // Point dipole approximation outside the magnet, moment along +x; B in tesla.
 const r2=x*x+y*y;if(r2<.01)throw new RangeError('Point inside dipole exclusion region');
 const factor=1e-7*moment/Math.pow(r2,1.5),bx=factor*(3*x*x/r2-1),by=factor*3*x*y/r2;
 return {bx,by,magnitude:Math.hypot(bx,by),angle:Math.atan2(by,bx)};
}
export function induction({position=0,velocity=.5,turns=100},time=0) {
 // Prescribed localized flux profile, not a claim of exact real magnet geometry.
 const sigma=.6,peak=.002,x=position+velocity*time,flux=peak*Math.exp(-x*x/(2*sigma*sigma));
 return {x,flux,emf:turns*x/(sigma*sigma)*flux*velocity};
}
export function robotStep(state,{left,right,track=.4},dt) {
 const speed=(left+right)/2,omega=(right-left)/track,angle=state.angle+omega*dt;
 const x=state.x+(Math.abs(omega)<1e-9?speed*Math.cos(state.angle)*dt:speed/omega*(Math.sin(angle)-Math.sin(state.angle)));
 const y=state.y+(Math.abs(omega)<1e-9?speed*Math.sin(state.angle)*dt:-speed/omega*(Math.cos(angle)-Math.cos(state.angle)));
 return {x,y,angle,distance:state.distance+Math.abs(speed)*dt,leftDistance:(state.leftDistance||0)+left*dt,rightDistance:(state.rightDistance||0)+right*dt};
}
export function rayBox(x,y,angle,box) {
 const dx=Math.cos(angle),dy=Math.sin(angle);let lo=-Infinity,hi=Infinity;
 for(const [origin,direction,min,max] of [[x,dx,box.x,box.x+box.w],[y,dy,box.y,box.y+box.h]]) {
  if(Math.abs(direction)<1e-10){if(origin<min||origin>max)return Infinity;continue;}
  const a=(min-origin)/direction,b=(max-origin)/direction;lo=Math.max(lo,Math.min(a,b));hi=Math.min(hi,Math.max(a,b));
 }
 return hi>=Math.max(0,lo)?Math.max(0,lo):Infinity;
}
export const OBSTACLE={x:4,y:1.2,w:.6,h:1.6};
export function robotSensor(state){
 // Inside the room, the far intersection is the wall in the forward direction.
 const dx=Math.cos(state.angle),dy=Math.sin(state.angle),hits=[];
 if(dx>1e-9)hits.push((8-state.x)/dx);if(dx< -1e-9)hits.push(-state.x/dx);
 if(dy>1e-9)hits.push((4-state.y)/dy);if(dy< -1e-9)hits.push(-state.y/dy);
 return Math.max(0,Math.min(...hits.filter(x=>x>=0),rayBox(state.x,state.y,state.angle,OBSTACLE))-.2);
}
export function safeRobotStep(state,p,dt) {
 const sensor=robotSensor(state),turn=p.avoid&&sensor<.8;
 const actual=turn?{...p,left:-.25,right:.25}:p,next=robotStep(state,actual,dt),r=.2;
 const closestX=Math.max(OBSTACLE.x,Math.min(next.x,OBSTACLE.x+OBSTACLE.w)),closestY=Math.max(OBSTACLE.y,Math.min(next.y,OBSTACLE.y+OBSTACLE.h));
 const collision=next.x<r||next.x>8-r||next.y<r||next.y>4-r||Math.hypot(next.x-closestX,next.y-closestY)<r;
 return {...(collision?state:next),collision,turning:turn,actualLeft:actual.left,actualRight:actual.right};
}
export const ELEMENTARY_CHARGE=1.602176634e-19;
export const COULOMB=8.9875517923e9;
export function electrostatic(p) {
 const dx=(p.x2??.7)-(p.x1??-.7),dy=(p.y2??0)-(p.y1??0),distance=Math.hypot(dx,dy);
 if(distance<.1)throw new RangeError('Charges must remain separated by 0.1 m');
 const signed=COULOMB*p.q1*1e-9*p.q2*1e-9/(distance*distance);
 return {distance,force:Math.abs(signed),fx:signed*dx/distance,fy:signed*dy/distance,attract:signed<0,total:p.q1+p.q2};
}
export function electricField(p){const x=p.x??.7,y=p.y??.4,r=Math.hypot(x,y);if(r<.1)throw new RangeError('Probe too near source');const magnitude=COULOMB*(p.charge??2)*1e-9/(r*r);return {ex:magnitude*x/r,ey:magnitude*y/r,magnitude:Math.abs(magnitude),force:magnitude*(p.test??1)*1e-9};}
export function atom({protons=3,neutrons=4,electrons=3}){return {protons,neutrons,electrons,charge:protons-electrons,reservoir:electrons-protons,coulombs:(protons-electrons)*ELEMENTARY_CHARGE};}
export function transfer({electrons=0}) {return {a:electrons,b:-electrons,total:0};}
export function daniell(p) {
 const valid=p.zinc!==false&&p.copper!==false&&p.solution!==false&&p.bridge!==false;
 const connected=p.wire!==false,current=valid&&connected?1.1/(p.resistance||100):0;
 return {valid,current,voltage:valid&&p.meter!==false?1.1:null,sustained:valid&&connected,oxidation:'Zn → Zn²⁺ + 2e⁻',reduction:'Cu²⁺ + 2e⁻ → Cu'};
}
