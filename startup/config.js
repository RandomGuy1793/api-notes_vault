const config=require('config')

module.exports=function(){
    if(!config.get('jwtKey')){
        throw new Error('notes_vault_jwtKey is not set as environment variable')
    }
}