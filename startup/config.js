const config=require('config')

module.exports=function(){
    if(!config.get('jwtKey')){
        throw new Error('notes_vault_jwtKey is not set as environment variable')
    }
    if(!config.get('PORT')){
        throw new Error('notes_vault_port is not set as environment variable')
    }
}