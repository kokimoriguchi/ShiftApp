# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_07_09_052601) do

  create_table "employees", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.integer "number", null: false
    t.string "password_digest", null: false
    t.boolean "is_manager", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "store_id"
    t.index ["number"], name: "index_employees_on_number", unique: true
    t.index ["store_id"], name: "index_employees_on_store_id"
  end

  create_table "employer_shifts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "shift_date_id"
    t.bigint "employee_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_employer_shifts_on_employee_id"
    t.index ["shift_date_id"], name: "index_employer_shifts_on_shift_date_id"
  end

  create_table "shift_dates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.date "work_day", null: false
    t.boolean "is_attendance", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "shift_times", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.time "start_time"
    t.time "end_time"
    t.bigint "shift_date_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shift_date_id"], name: "index_shift_times_on_shift_date_id"
  end

  create_table "stores", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.integer "number", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_stores_on_name", unique: true
    t.index ["number"], name: "index_stores_on_number", unique: true
    t.index ["password_digest"], name: "index_stores_on_password_digest", unique: true
  end

  add_foreign_key "employees", "stores"
  add_foreign_key "employer_shifts", "employees"
  add_foreign_key "employer_shifts", "shift_dates"
  add_foreign_key "shift_times", "shift_dates"
end
