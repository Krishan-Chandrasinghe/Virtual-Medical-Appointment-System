import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    regNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    dob: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    drugAllergies: { type: [String], default: [] },
}, { timestamps: true });


usersSchema.statics.Signup = async function (userData) {
    const {
        email, password, firstName, lastName, regNumber, role = 'user',
        gender, dob, height, weight, address, phone, drugAllergies
    } = userData;

    const requiredFields = [
        'email', 'password', 'firstName', 'lastName',
        'regNumber', 'gender', 'dob', 'height', 'weight', 'address', 'phone'
    ];

    for (const field of requiredFields) {
        if (!userData[field]) {
            throw Error(`Field "${field}" is required!`);
        }
    }

    // Email validation
    if (!validator.isEmail(email)) throw Error('Email is not valid!');

    // Password strength validation
    if (!validator.isStrongPassword(password)) throw Error('Weak password! Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.');

    // Role validation
    if (role && !['user', 'admin'].includes(role)) {
        throw Error('Role must be either "user" or "admin"');
    }

    // Gender validation
    const normalizedGender = gender.toLowerCase().trim();
    if (!['male', 'female'].includes(normalizedGender)) {
        throw Error('Gender must be either "male" or "female"');
    }

    // Date of birth validation
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) throw Error('Invalid date of birth');
    if (birthDate > new Date()) throw Error('Date of birth cannot be in the future');

    // Height and weight validation
    if (height < 50 || height > 250) throw Error('Height must be between 50cm and 250cm');
    if (weight < 20 || weight > 200) throw Error('Weight must be between 20kg and 200kg');

    // Phone validation
    const phoneRegex = /^[\+]?[0-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) throw Error('Please provide a valid phone number');

    // Drug allergies validation and processing
    let allergiesArray = [];
    if (drugAllergies) {
        if (Array.isArray(drugAllergies)) {
            allergiesArray = drugAllergies.map(item => item.trim()).filter(item => item);
        } else if (typeof drugAllergies === 'string') {
            allergiesArray = drugAllergies.split(',').map(item => item.trim()).filter(item => item);
        }
        console.log("this: ", allergiesArray)
    }

    // Check for existing user
    const [existingEmail, existingRegNumber] = await Promise.all([
        this.findOne({ email }),
        this.findOne({ regNumber })
    ]);

    if (existingEmail) throw Error('User email already in use!');
    if (existingRegNumber) throw Error('Registration number already in use!');

    // Hash password
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const hashPwd = await bcrypt.hash(password, salt);

    // Create user
    const user = await this.create({
        email: email.toLowerCase().trim(),
        password: hashPwd,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        regNumber: regNumber.trim().toUpperCase(),
        role: role.trim(),
        gender: normalizedGender,
        dob: birthDate,
        height: Number(height),
        weight: Number(weight),
        address: address.trim(),
        phone: cleanPhone,
        drugAllergies: allergiesArray
    });

    return user;
};

usersSchema.statics.Login = async function (email, password) {

    // validate inputs
    if (!email || !password) throw Error('All feilds are required!');

    const user = await this.findOne({ email });

    if (!user) throw Error('User is not signed in!');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw Error('Incorrect password!');

    return user;
}

export default mongoose.model('Users', usersSchema);