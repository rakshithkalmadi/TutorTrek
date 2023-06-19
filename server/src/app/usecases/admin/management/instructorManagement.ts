import { AdminDbInterface } from '../../../repositories/adminDbRepository';
import HttpStatusCodes from '../../../../constants/HttpStatusCodes';
import AppError from '../../../../utils/appError';
import { SendEmailService } from '@src/frameworks/services/sendEmailService';
export const getAllInstructorRequests = async (
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const allRequests = await adminRepository.getInstructorRequests();
  if (allRequests.length === 0) {
    return null;
  }
  return allRequests;
};

export const acceptInstructorRequest = async (
  instructorId: string,
  adminRepository: ReturnType<AdminDbInterface>,
  emailService: ReturnType<SendEmailService>
) => {
  if(!instructorId){
    throw new AppError("Invalid instructor id",HttpStatusCodes.BAD_REQUEST)
  }
  const response = await adminRepository.acceptInstructorRequest(instructorId);
  if (response) {
    emailService.sendEmail(
      response.email,
      'Successfully verified your profile',
      'You are verified'
    );
  }
  return response;
};

export const rejectInstructorRequest = async (
  instructorId: string,
  reason: string,
  adminRepository: ReturnType<AdminDbInterface>,
  emailService: ReturnType<SendEmailService>
) => {
  if (!instructorId || !reason) {
    throw new AppError(
      'InstructorId or reason cannot be empty',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const rejected = await adminRepository.checkRejected(instructorId);
  if (rejected) {
    throw new AppError(
      'Already rejected this request',
      HttpStatusCodes.CONFLICT
    );
  }
  const response = await adminRepository.rejectInstructorRequest(
    instructorId,
    reason
  );
  if (response) {
    emailService.sendEmail(
      response.email,
      'Sorry your request is rejected',
      reason
    );
  }
  return response;
};

export const getAllInstructors = async (
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const instructors = await adminRepository.getAllInstructors();
  return instructors;
};

export const blockInstructors = async (
  instructorId: string,
  reason: string,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  if (!instructorId || !reason) {
    throw new AppError(
      'Please provide instructor id and reason',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const response = await adminRepository.blockInstructors(instructorId, reason);
  return response;
};

export const unblockInstructors = async (
  instructorId: string,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  if(!instructorId){
    throw new AppError("Invalid instructor id",HttpStatusCodes.BAD_REQUEST)
  }
  const response = await adminRepository.unblockInstructors(instructorId);
  return response;
};

export const getBlockedInstructors = async (
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const blockedInstructors = await adminRepository.getBlockedInstructors();
  return blockedInstructors;
};

export const getInstructorByIdUseCase = async (
  instructorId: string,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  if(!instructorId){
    throw new AppError("Invalid instructor id",HttpStatusCodes.BAD_REQUEST)
  }
  const instructor = await adminRepository.getInstructorById(instructorId)
  return instructor
};