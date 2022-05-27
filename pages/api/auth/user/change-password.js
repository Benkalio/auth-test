import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  // most important authentication setup *** 
  // Protecting API routes -- for only authenticated users!
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // Replace old password with new password
  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    // or 422 saying input is wrong or 403 invalid password
    res.status(403).json({message: "Invalid password"});
    client.close()
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );


  client.close();
  res.status(200).json({ message: "Successfully updated password" });
}

export default handler;
