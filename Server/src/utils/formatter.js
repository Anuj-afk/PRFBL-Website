import jwt from "jsonwebtoken"

export const formatDataToSend = (user) => {
    const accessToken = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY_USER)
    return {
        accessToken,
        username: user.personal_info.username,
        fullname: user.personal_info.name,
        email: user.personal_info.email,
    }
}

export const formatDataToSendAdmin = (user) => {
    const accessToken = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY_ADMIN, {expiresIn: "7d"})
    return {
        accessToken,
        id: user._id,
        username: user.personal_info.username,
        fullname: user.personal_info.name,
        email: user.personal_info.email,
    }
}
