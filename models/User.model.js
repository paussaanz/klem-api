const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ROUNDS = 10;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, 'Add a valid email'],
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      default: ''
    },
    position: {
      type: String,
    },
    duties: {
      type: String,
    },
    schedule: {
      type: String,
    },
    developmentGoals: {
      type: String,
    },
    extraSkills: {
      type: String,
      default: ''
    },
    hobbies: {
      type: String,
      default: ''
    },
    team: {
      type: String,
    },
    clients: [{
      type: String
    }],
    formagameScore: {
      type: Number,
      default: 0
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    team: {
      type: String
    },
    clientsWorkingOn: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Sirve para cambiar el output de los endpoints cuando hago res.json
        ret.id = ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  foreignField: 'userId',
  localField: '_id',
  justOne: false
})

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

// Guardamos la contraseña hasheada con bcrypt
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
    // .catch(err => next(err))
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User