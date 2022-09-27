import { Migration } from '../umzug';
import { DataTypes } from 'sequelize';
import { constents } from '../../../configs/constents.config';
import { Op } from 'sequelize';
import { dataCourseQuizModule1, dataCourseQuizModule3 } from '../data/course_quiz_data';

// you can put some table-specific imports/code here
export const tableName = "quiz_questions";
export const up: Migration = async ({ context: sequelize }) => {
	// await sequelize.query(`raise fail('up migration not implemented')`); //call direct sql 
	//or below implementation 

	///QUIZ 1

	dataCourseQuizModule1.forEach(async(question,index)=>{
		// console.log(question)
		//////Question  1
		await createQuizQuestion(sequelize,
			1, Number(question.question_no),
			question.question,
			question.option_a!,
			question.option_b,
			question.option_c,
			question.option_d,
			question.correct_ans,
			Number(question.ar_video_ans_wrong),
			question.level,
			question.msg_ans_correct,
			question.msg_ans_wrong,
			question.type,
			question.question_image,
			question.ar_image_ans_correct,
			question.ar_video_ans_correct,
			question.accimg_ans_correct,
			question.ar_image_ans_wrong,
			question.ar_video_ans_wrong,
			question.accimg_ans_wrong,
			question.question_icon,
			)
	});

	dataCourseQuizModule3.forEach(async(question,index)=>{
		// console.log(question)
		//////Question  1
		await createQuizQuestion(sequelize,
			2, Number(question.question_no),
			question.question,
			question.option_a!,
			question.option_b,
			question.option_c,
			question.option_d,
			question.correct_ans,
			Number(question.ar_video_ans_wrong),
			question.level,
			question.msg_ans_correct,
			question.msg_ans_wrong,
			question.type,
			question.question_image,
			question.ar_image_ans_correct,
			question.ar_video_ans_correct,
			question.accimg_ans_correct,
			question.ar_image_ans_wrong,
			question.ar_video_ans_wrong,
			question.accimg_ans_wrong,
			question.question_icon,
			)
	});
};

async function createQuizQuestion(
	sequelize: any,
	arg_quiz_id: number,
	arg_question_no: number,
	arg_q_txt: string,
	arg_o_txt1: string, arg_o_txt2: string, arg_o_txt3: any, arg_o_txt4: any,
	arg_correct_ans: string,
	arg_redirect_to: number,
	arg_level: string,
	arg_msg_ans_correct: any = "keep up the good work.",
	arg_msg_ans_wrong: any = "Opps may be you need to watch video again.",
	arg_quiz_type: any = "MRQ",
	arg_question_image: any = null,
	//extra
	ar_image_ans_correct: any = null,
	ar_video_ans_correct: any = null,
	accimg_ans_correct: any = null,
	ar_image_ans_wrong: any = null,
	ar_video_ans_wrong: any = null,
	accimg_ans_wrong: any = null,
	arg_question_icon: any = null,
) {
	const courseQzInsterted = await sequelize.getQueryInterface().bulkInsert('quiz_questions', [
		{
			quiz_id: arg_quiz_id,
			question_no: arg_question_no,
			question: arg_q_txt,
			option_a: arg_o_txt1,
			option_b: arg_o_txt2,
			option_c: arg_o_txt3,
			option_d: arg_o_txt4,
			correct_ans: arg_correct_ans,
			redirect_to: arg_redirect_to,
			level: arg_level,
			type: arg_quiz_type,
			question_image: arg_question_image,
			question_icon:arg_question_icon,
			msg_ans_correct: arg_msg_ans_correct,
			msg_ans_wrong: arg_msg_ans_wrong,
			ar_image_ans_correct: ar_image_ans_correct,
			ar_video_ans_correct: ar_video_ans_correct,
			accimg_ans_correct: accimg_ans_correct,
			ar_image_ans_wrong: ar_image_ans_wrong,
			ar_video_ans_wrong: ar_video_ans_wrong,
			accimg_ans_wrong: accimg_ans_wrong,
			created_by: 1,
			updated_by: 1,
		}
	]);

	return courseQzInsterted

}

export const down: Migration = async ({ context: sequelize }) => {
	// 	await sequelize.query(`raise fail('down migration not implemented')`); //call direct sql 
	//or below implementation 
	await sequelize.getQueryInterface().bulkDelete(tableName, { quiz_id: { [Op.in]: [1, 2, 3, 4, 5, 6] } }, {});
};