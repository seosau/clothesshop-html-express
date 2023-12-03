const user = require('../../models/user');
const jwt = require("jsonwebtoken");
const database = require('../../config/database');

class SiteController {
    // async index(req, res) {
    //     const token = await req.cookies.token;
    //     if (token) {
    //         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //             if (err) {
    //                 return res.send('Xin chào! Đây là trang chủ');
    //             }
    //             if (user.role_id === 2)
    //                 res.render('home', {
    //                     user: user
    //                 })
    //             else
    //                 res.redirect('/admin/dashboard');
    //         });
    //     }
    //     else {
    //         res.render('home', {
    //             user: null
    //         })
    //     }
    // }
    async index(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('home', {
                user: null
            })
        }
        console.log(user)
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('home', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }
    logOut(req, res) {
        res.clearCookie('token');
        console.log('logout completed');
        res.redirect('/');
    }
    async getBestSells(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const query = `
                            
                            SELECT P.id, P.title, P.price, P.thumbnail
                            FROM Products P
                            JOIN (
                            SELECT product_id, SUM(quantity) as total_sold
                            FROM Order_Details OD
                            JOIN Orders O ON OD.order_id = O.id
                            WHERE O.status = 1
                            GROUP BY product_id
                            ORDER BY total_sold DESC
                            LIMIT 10
                            ) AS TopProducts ON P.id = TopProducts.product_id
                            ORDER BY TopProducts.total_sold DESC;
                        `;
            db.query(query, [roleId], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getNews(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            ORDER BY created_at DESC
                            LIMIT 10;            
                        `;
            db.query(query, [roleId], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }



}

module.exports = new SiteController;