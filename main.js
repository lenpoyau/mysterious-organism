// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory(speciNum,arrdna) {
  return {
    specimenNum: speciNum,
    arrDna: arrdna,
    mutate() {
      // random Location on DNA
      let mutix = Math.floor(Math.random() * 15);
      
      // Get old base letter
      let oldDnaBase = this.arrDna[mutix];
      
      // Swap out old base with new. Old/New different
      let newBase = returnRandBase();
      while (oldDnaBase === newBase ) {
            newBase = returnRandBase();
      } 
      this.arrDna.splice(mutix,1,newBase);
      return this.arrDna;
    },
    compareDNA(secondObject) {
       let sameBaseCount=0;
       for(let i=0; i < 15; i++) {
         if(this.arrDna[i] === secondObject.arrDna[i]) {
             sameBaseCount +=1;
          } // end if block
       } // end For loop

       // calculate percent DNA the 2 specimens share
       // toFixed() method limit decimals points to 2.
       let result = ((sameBaseCount / 15) * 100).toFixed(2);
       console.log(`specimen #${this.specimenNum} and specimen #${secondObject.specimenNum} have ${result}% DNA in common`);
    },

    willLikelySurvive() {
        let aOrCcount=0;
        for(let i=0; i < 15;i++) {
          if(this.arrDna[i] === 'C' || this.arrDna[i] === 'G'){
              aOrCcount += 1;
          }
        }
        
      let result = ((aOrCcount / 15) * 100).toFixed(2);
       return result >= 60 ? true : false;
    }
 }
}

function pAequorcreate (num) {
    let speciArr = [];
    let ObjCount = 1;
    while(ObjCount <= num) {
      // Create Speci object instances likely to survive
      speci = pAequorFactory(ObjCount,mockUpStrand());
      if(speci.willLikelySurvive() === true) {
        speciArr.push(speci);
        ObjCount += 1;
      }
    }
    return speciArr;
}

// const arrOfpAequor = pAequorcreate(30);

/* =============== Below lines used to test the functions ================ */

let specimen = pAequorFactory(1,mockUpStrand());
const specimen1 = specimen;
console.log(`Specimen ${specimen1.specimenNum} \nits un-mutated Dna strand is: ${specimen1.arrDna}`);

console.log('Its mutated Dna strand is   : ' + specimen1.mutate());
console.log("");

// create a second organism object
specimen = pAequorFactory(2,mockUpStrand());
const specimen2 = specimen;

console.log(`Specimen ${specimen2.specimenNum} \nits un-mutated Dna strand is: ${specimen2.arrDna}`);
console.log('Its mutated Dna strand is   : ' + specimen2.mutate());

console.log("");
specimen1.compareDNA(specimen2);

console.log("");

console.log('Specimen1 Likely to survive: ' + specimen1.willLikelySurvive());
console.log('Specimen2 Likely to survive: ' + specimen2.willLikelySurvive());

// Create a batch of Organism like to survive. In this case 4 Organism Object instances
console.log("\nCreating a batch of Specimens likely to survive.");
const arrOfpAequor2 = pAequorcreate(4);
console.log(arrOfpAequor2);

for(let i=0; i < 4; i++) {
    console.log(`Specimen ${arrOfpAequor2[i].specimenNum} is likely to survive: ${arrOfpAequor2[i].willLikelySurvive()}`);
  }