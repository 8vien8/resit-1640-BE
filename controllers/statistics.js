const Faculty = require('../models/faculties');
const User = require('../models/users');
const Role = require('../models/roles');
const Topic = require('../models/topics');
const Contribution = require('../models/contributions');
const Contribution_Status = require('../models/contributionsStatus');
const Public_Contribution = require('../models/publicContribution');


const generateFacultyReport = async () => {
    try {
        // Lấy tất cả các khoa trong hệ thống
        const faculties = await Faculty.find();

        const report = [];

        // Lặp qua từng khoa để thu thập thông tin
        for (let faculty of faculties) {
            const facultyReport = {};

            // Lấy số lượng thành viên trong khoa
            const usersInFaculty = await User.find({ facultyID: faculty._id });

            // Tính số lượng thành viên theo vai trò trong khoa (coordinator, student, manager)
            const roleCounts = { coordinator: 0, student: 0 };
            let manager = null;
            for (let user of usersInFaculty) {
                const role = await Role.findById(user.roleID);
                if (role.roleName === 'Coordinator') {
                    roleCounts.coordinator++;
                } else if (role.roleName === 'Student') {
                    roleCounts.student++;
                } else if (role.roleName === 'Manager') {
                    manager = user.username;
                }
            }

            // Tính số lượng topics trong khoa
            const topicsInFaculty = await Topic.find({ faculty: faculty._id });

            // Tính số lượng contributions trong từng topic và phân loại trạng thái
            let totalContributions = 0;
            let approvedContributions = 0;
            let rejectedContributions = 0;
            let publicContributions = 0;

            for (let topic of topicsInFaculty) {
                const contributionsInTopic = await Contribution.find({ topicID: topic._id });
                totalContributions += contributionsInTopic.length;

                for (let contribution of contributionsInTopic) {
                    const contributionStatus = await Contribution_Status.findById(contribution.statusID);
                    if (contributionStatus.statusName === 'Approved') {
                        approvedContributions++;
                    } else if (contributionStatus.statusName === 'Rejected') {
                        rejectedContributions++;
                    }

                    // Kiểm tra xem contribution có được công nhận là public không
                    const publicContribution = await Public_Contribution.findOne({ contributionID: contribution._id });
                    if (publicContribution) {
                        publicContributions++;
                    }
                }
            }

            // Thêm thông tin vào báo cáo
            facultyReport.facultyName = faculty.facultyName;
            facultyReport.memberCount = usersInFaculty.length;
            facultyReport.roleCounts = roleCounts;
            facultyReport.manager = manager;
            facultyReport.topicCount = topicsInFaculty.length;
            facultyReport.contributionCount = totalContributions;
            facultyReport.approvedCount = approvedContributions;
            facultyReport.rejectedCount = rejectedContributions;
            facultyReport.publicCount = publicContributions;

            report.push(facultyReport);
        }

        return report;
    } catch (error) {
        console.error('Error generating faculty report:', error);
        throw error;
    }
};

// API endpoint to fetch the statistics report
const getStatisticsReport = async (req, res) => {
    try {
        const report = await generateFacultyReport();
        res.json({ report });
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};

module.exports = { getStatisticsReport };
