const Config={
    ROSBRIDGE_SERVER_IP: "192.168.43.119",
    ROSBRIDGE_SERVER_PORT: "9090",
    TOPIC_CMD_VEL: "/cmd_vel",
    TOPIC_ARM_CMD_VEL: "/arm_cmd_vel",

    MSG_TWIST: "geometry_msgs/Twist",

    TOPIC_IMAGE: "/camera1/image_raw/compressed",
    MSG_IMAGE: "sensor_msgs/msg/CompressedImage",

    TOPIC_MAP: "/map",
    MSG_MAP: "nav_msgs/msg/OccupancyGrid"
};

export default Config