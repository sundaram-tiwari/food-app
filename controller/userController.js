//Get user info
const getUserController = async (reqq,res) => {
    res.status(200).send({
        success:true,
        message:'User Info'
    })
};

module.exports = { getUserController }