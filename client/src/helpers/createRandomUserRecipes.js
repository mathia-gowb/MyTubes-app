export function createRandomUserRecipes(array1=[],array2=[]){
    //get last index of array 1 & 2
    const arrLastIndex=array1.length-1;
    return arraySnippetMaker(array1,arrLastIndex);
}

function arraySnippetMaker(array,lastIndex){
    let tempArr=[];
    let iterationsTracker = 0;
    //get last 6 elements of
    for(let i=0;i<lastIndex;i++){
        if(iterationsTracker>=10){
            break
        }
        tempArr.push(array[i])
        iterationsTracker++
    };
    return tempArr;
}