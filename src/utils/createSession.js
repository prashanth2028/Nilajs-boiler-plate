import crypto from 'crypto';


export const createSession = async (user) => {
    try {
      const tokenParams = {
        id: user._id,
        email: user.email,
        time: new Date().valueOf()
      };
  
      await checkSession(user._id);
  
      const sessionParam = {
        session_token: encrypt(JSON.stringify(tokenParams)),
        user_id: user._id,
      };
  
      const sessionCreated = await new session(sessionParam).save();
  
      return sessionCreated;
    } catch (error) {
      throw error.message;
    }
  };


export const checkSession = async (id) => {
    try {
      const result = await session.find({ user_id: id });
  
      if (result.length > 50) {
        await session.deleteMany({ user_id: id });
      }
  
      return 'success';
    } catch (error) {
      console.error(err)
      throw error.message;
    }
  };


const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 32 bytes for AES-256
const iv = crypto.randomBytes(16); // 16 bytes for AES

// Encrypt function
export const encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${encrypted}:${iv.toString('hex')}`;
};


//decrypt function
export const decrypt = (encryptedText) => {
    const [encrypted, ivHex] = encryptedText.split(':');
    let decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };