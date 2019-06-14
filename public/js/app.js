const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const par1=document.querySelector('#par1')
const par2=document.querySelector('#par2')

//para1.textContent='From javascript'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    
    var url="http://localhost:3000/weather?address="    
    url=url+location   
    
    par1.textContent='Loading...'
    par2.textContent=''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
        if(data.error){
            return par1.textContent=data.error
        }
        par1.textContent=data.location
        par2.textContent=data.forecast
    })
})    
})