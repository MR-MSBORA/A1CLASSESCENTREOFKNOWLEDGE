import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.model.js';
import connectDB from '../config/db.js';

const seedSuperAdmin = async () => {
  await connectDB();

  // Check if superadmin already exists
  const existing = await User.findOne({ role: 'superadmin' });

  if (existing) {
    console.log('✅ Super Admin already exists:', existing.email);
    process.exit(0);
  }

  // Create superadmin
  const superAdmin = await User.create({
    name:     'Super Admin',
    email:    process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
    role:     'superadmin',
  });

  console.log('🎉 Super Admin created successfully!');
  console.log('📧 Email:', superAdmin.email);
  console.log('🔑 Role:', superAdmin.role);
  process.exit(0);
};

seedSuperAdmin().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});