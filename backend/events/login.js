import { Player } from '../models/schemas'
import { sendData } from '../util/wssConnect'

const usualLogin = async (connection, datas) => {
	var { password, email } = datas
	var user = await Player.findOne({ email, password })
	if (!user) {
		sendData(['loginFail', null], connection)
		return { success: false }
	} else {
		sendData(['loginSuccess', user], connection)
		return { success: true, name: user.name }
	}
}

const googleLogin = async (connection, datas) => {
	var { name, email, imageUrl } = datas
	var user = await Player.findOne({ email })
	if (user) {
		sendData(['loginSuccess', user], connection)
		return { success: true, name: user.name }
	} else {
		let newUser = await new Player({ name, email }).save()
		sendData(['loginSuccess', newUser], connection)
		return { success: true, name: name }
	}
}

const createAccount = async (connection, datas) => {
	var { name, email, password } = datas
	var user = new Player({ name, email, password })
	try {
		await user.save()
		sendData(['loginSuccess', user], connection)
		return { success: true, name: user.name }
	} catch (err) {
		sendData(['createFail', null], connection)
		return { success: false }
	}
}

export { usualLogin, googleLogin, createAccount }
